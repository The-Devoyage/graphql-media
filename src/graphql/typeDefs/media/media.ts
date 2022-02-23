import { gql } from "apollo-server-express";

export const Media = gql`
  type Media @key(fields: "_id") {
    _id: ObjectID!
    createdAt: String!
    updatedAt: String!
    path: String!
    mimetype: String!
    created_by: User!
    title: String!
  }
`;
