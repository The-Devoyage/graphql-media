import { gql } from "apollo-server-express";

export const User = gql`
  extend type User @key(fields: "_id") {
    _id: ObjectID! @external
  }
`;
