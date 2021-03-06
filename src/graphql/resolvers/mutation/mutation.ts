import { finished } from "stream";
import fs from "fs";
import path from "path";
import { Media } from "@src/models";
import { MutationResolvers, Media as IMedia } from "types/generated";
import { Helpers } from "@the-devoyage/micro-auth-helpers";

export const Mutation: MutationResolvers = {
  singleFileUpload: async (_parent, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const { createReadStream, filename, mimetype } = await args
        .singleFileUploadInput.file;

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
        path: path.join(context.config.express_route, mimetype, fileName),
        mimetype,
        title: args.singleFileUploadInput.title,
        created_by: context.auth.payload.user?._id,
      });

      await newMedia.save();

      const media = await Media.findOne<IMedia>({ _id: newMedia?._id });

      if (!media) {
        throw new Error("This media/file can not be found.");
      }

      return media;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteMedia: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const media = await Media.find<IMedia>({
        _id: { $in: args.deleteMediaInput?._ids },
      });

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

      const deleteStatus = await Media.deleteMany({
        _id: { $in: args.deleteMediaInput?._ids },
      });

      return { deletedCount: deleteStatus.deletedCount };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
