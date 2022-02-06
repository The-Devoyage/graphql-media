import { checkAuth } from "@src/helpers";
import { finished } from "stream";
import fs from "fs";
import path from "path";
import { Media } from "@src/models";
import { MutationResolvers } from "types/generated";

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

      const directory =
        process.env.NODE_ENV === "development"
          ? context.config.write_directory.dev
          : process.env.NODE_ENV === "staging"
          ? context.config.write_directory.stag
          : context.config.write_directory.prod;

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      const fileName = `/uploads/${mimetype}/${
        context.token.user?._id
      }-${Date.now()}-${filename}`;

      const out = fs.createWriteStream(path.join(directory, fileName));

      stream.pipe(out);
      finished(out, (err) => {
        if (err) {
          console.log(err);
          throw new Error("Something went wrong when uploading your file.");
        }
      });

      const newMedia = new Media({
        path: path.join("public", fileName),
        mimetype,
        title: args.singleFileUploadInput.title,
        created_by: context.token.user?._id,
      });

      await newMedia.save();

      const media = await Media.findOne({ _id: newMedia._id });

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
