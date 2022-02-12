import { buildSubgraphSchema } from "@apollo/federation";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { GraphQL } from "@the-devoyage/mongo-filter-generator";

export const schema = buildSubgraphSchema([
  { typeDefs: typeDefs.Media, resolvers: resolvers.Media },
  { typeDefs: GraphQL.typeDefs, resolvers: GraphQL.resolvers },
]);
