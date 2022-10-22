import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { Media } from "@src/models";
import { QueryResolvers, Media as IMedia } from "types/generated";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
import { createSrc } from "@src/utils/create-src";

export const Query: QueryResolvers = {
  getMedia: async (_parent, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });

      if (
        args.getMediaInput.transform &&
        (!process.env.ENABLE_IMGPROXY ||
          process.env.ENABLE_IMGPROXY === "false")
      ) {
        throw new Error(
          "Image proxy is not enabled for this server. The transform payload should be excluded from requests."
        );
      }

      const { filter, options } = GenerateMongo<IMedia>({
        fieldFilters: args.getMediaInput.query,
        config: args.getMediaInput.config,
      });

      const media = await Media.findAndPaginate<IMedia>(filter, options, {
        history: {
          filter: {
            interval: args.getMediaInput.config?.history?.interval ?? [],
          },
        },
      });

      const withSrc = createSrc(
        media.data,
        args.getMediaInput.transform
      ) as IMedia[];

      media.data = withSrc;

      return media;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
