import { gql } from "apollo-server-express";

export const Mutation = gql`
  scalar Upload

  input SingleFileUploadInput {
    file: Upload!
    title: String!
  }

  extend type Mutation {
    singleFileUpload(singleFileUploadInput: SingleFileUploadInput!): Media!
  }
`;
