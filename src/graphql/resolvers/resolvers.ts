import { Media } from "./media";
import { GraphQLUpload } from "graphql-upload";
import { Query } from "./query";
import { Mutation } from "./mutation";
import { Resolvers } from "types/generated";

export const resolvers: Resolvers = {
  Media: {
    Upload: GraphQLUpload,
    Query,
    Mutation,
    Media,
  },
};
