import { Media as MediaModel } from "@src/models";
import { ApolloError } from "apollo-server-express";
import { MediaResolvers, Media as IMedia } from "types/generated";

export const Media: MediaResolvers = {
  __resolveReference: async (ref: IMedia) => {
    try {
      const media = await MediaModel.findOne<IMedia>({ _id: ref._id });

      if (!media) {
        throw new Error("Could not find media.");
      }

      if (process.env.FILE_SERVER_BASE_URL) {
        media.src = encodeURI(process.env.FILE_SERVER_BASE_URL + media?.path);
      } else {
        throw new ApolloError(
          "Missing env variable, `FILE_SERVER_BASE_URL`, in the Media Micro Service."
        );
      }

      return media;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
