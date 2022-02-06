import { Media as MediaModel } from "@src/models";
import { MediaResolvers, Media as IMedia } from "types/generated";

export const Media: MediaResolvers = {
  __resolveReference: async (ref: IMedia) => {
    try {
      const media = await MediaModel.findOne({ _id: ref._id });
      return media;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
