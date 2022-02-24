import { gql } from "apollo-server-express";

export const Media = gql`
  type Media @key(fields: "_id") {
    _id: ObjectID!
    createdAt: DateTime!
    updatedAt: DateTime!
    path: String!
    mimetype: String!
    created_by: User!
    title: String!
  }
`;
