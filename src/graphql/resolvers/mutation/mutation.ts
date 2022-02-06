import { checkAuth } from "@src/helpers";
import { finished } from "stream";
import fs from "fs";
import path from "path";
import { Media } from "@src/models";
import { MutationResolvers, Media as IMedia } from "types/generated";

export const Mutation: MutationResolvers = {
  singleFileUpload: async (_parent, args, context) => {
    try {
      checkAuth({ context, requireUser: true });

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

      const fileName = `${context.token.user?._id}-${Date.now()}-${filename}`;

      const out = fs.createWriteStream(
        path.join(fullUploadDirectory, fileName)
      );

      stream.pipe(out);

      let media: IMedia | undefined | null;

      finished(out, async (err) => {
        if (err) {
          console.log(err);
          throw new Error("Something went wrong when uploading your file.");
        }

        const newMedia = new Media({
          path: path.join(context.config.express_route, mimetype, fileName),
          mimetype,
          title: args.singleFileUploadInput.title,
          created_by: context.token.user?._id,
        });

        await newMedia.save();

        media = newMedia;
      });

      media = await Media.findOne<IMedia>({ _id: media?._id });

      if (!media) {
        throw new Error("Something went wrong when saving your file.");
      }

      return media;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
