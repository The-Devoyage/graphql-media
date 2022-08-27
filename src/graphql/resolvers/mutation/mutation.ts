import { finished } from "stream";
import fs from "fs";
import path from "path";
import { Media } from "@src/models";
import {
  MutationResolvers,
  Media as IMedia,
  UploadError,
} from "types/generated";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { ApolloError } from "apollo-server-express";

export const Mutation: MutationResolvers = {
  createMedia: async (_parent, args, context) => {
    Helpers.Resolver.CheckAuth({ context, requireUser: true });

    const media: IMedia[] = [];
    const errors: UploadError[] = [];

    for (const mediaPayload of args.createMediaInput.payload) {
      try {
        const {
          createReadStream,
          filename,
          mimetype,
        } = await mediaPayload.file;

        const validMimetypes = context.config.mime_types;

        const isValidMimetype = validMimetypes.includes(mimetype);

        if (!isValidMimetype) {
          throw new Error("Invalid mime type.");
        }

        const stream = createReadStream();

        const rootUploadDirectory =
          process.env.NODE_ENV === "development"
            ? context.config.write_directory.dev
            : process.env.NODE_ENV === "staging"
            ? context.config.write_directory.stag
            : context.config.write_directory.prod;

        const fullUploadDirectory = path.join(rootUploadDirectory, mimetype);

        if (!fs.existsSync(fullUploadDirectory)) {
          fs.mkdirSync(fullUploadDirectory, { recursive: true });
        }

        const fileName = `${
          context.auth.payload.user?._id
        }-${Date.now()}-${filename}`;

        const out = fs.createWriteStream(
          path.join(fullUploadDirectory, fileName)
        );

        stream.pipe(out);

        finished(out, (err) => {
          if (err) {
            console.log(err);
            throw new Error("Something went wrong when uploading your file.");
          }
        });

        const newMedia = new Media({
          path: path.join("/", mimetype, fileName),
          mimetype,
          title: mediaPayload.title,
          created_by: context.auth.payload.user?._id,
        });

        await newMedia.save();

        media.push((newMedia as unknown) as IMedia);
      } catch (error) {
        console.log(error);
        errors.push({ error: error as string });
        continue;
      }
    }
    return { media, errors };
  },
  deleteMedia: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const { filter } = GenerateMongo<IMedia>({
        fieldFilters: args.deleteMediaInput.query,
      });

      const media = await Media.find<IMedia>(filter);

      if (
        media.some(
          (m) => m?.created_by.toString() !== context.auth.payload.user?._id
        )
      ) {
        Helpers.Resolver.LimitRole({
          userRole: context.auth.payload.user?.role,
          roleLimit: 1,
        });
      }

      const rootUploadDirectory =
        process.env.NODE_ENV === "development"
          ? context.config.write_directory.dev
          : process.env.NODE_ENV === "staging"
          ? context.config.write_directory.stag
          : context.config.write_directory.prod;

      const idsToDelete: string[] = [];
      const errors: NodeJS.ErrnoException[] = [];

      for (const m of media) {
        const mediaPath = path.join(rootUploadDirectory, m.path);
        try {
          fs.unlinkSync(mediaPath);
          idsToDelete.push(m._id);
        } catch (error) {
          console.log(error);
          if ((error as NodeJS.ErrnoException).code === "ENOENT") {
            idsToDelete.push(m._id);
          } else {
            errors.push(error as NodeJS.ErrnoException);
          }
        }
      }

      const deleteStatus = await Media.deleteMany({
        _id: { $in: idsToDelete },
      });

      if (errors.length) {
        throw new ApolloError(
          "Some errors found when deleting media.",
          "FS_DELETE_FAIL",
          {
            deletedCount: deleteStatus.deletedCount,
            errors,
          }
        );
      }

      return { deletedCount: deleteStatus.deletedCount };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
