import { Media } from "./media";
import { GraphQLUpload } from "graphql-upload";
import {
  DateTimeScalar,
  GraphQLObjectID,
} from "@the-devoyage/mongo-filter-generator";
import { Query } from "./query";
import { Mutation } from "./mutation";
import { Resolvers } from "types/generated";

export const resolvers: Resolvers = {
  DateTime: DateTimeScalar,
  Upload: GraphQLUpload,
  ObjectID: GraphQLObjectID,
  Query,
  Mutation,
  Media,
};
