import { Media } from "./media";
import { GraphQLUpload } from "graphql-upload";
import { Query } from "./query";
import { Mutation } from "./mutation";
import { Resolvers } from "types/generated";

export const resolvers: Resolvers = {
  Query: { Query },
  Mutation: { Mutation, Upload: GraphQLUpload },
  Media: {
    Media,
  },
};
