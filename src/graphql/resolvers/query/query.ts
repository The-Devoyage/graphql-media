import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { Media } from "@src/models";
import { QueryResolvers, Media as IMedia } from "types/generated";
import { Helpers } from "@the-devoyage/micro-auth-helpers";

export const Query: QueryResolvers = {
  getMedia: async (_parent, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });

      const { filter, options } = GenerateMongo<IMedia>({
        fieldFilters: args.getMediaInput,
        config: args.getMediaInput.config,
      });

      const media = await Media.findAndPaginate<IMedia>(filter, options);

      return media;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
