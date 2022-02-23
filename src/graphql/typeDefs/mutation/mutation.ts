import { gql } from "apollo-server-express";

export const Mutation = gql`
  scalar Upload

  input SingleFileUploadInput {
    file: Upload!
    title: String!
  }

  input DeleteMediaInput {
    _ids: [ObjectID!]!
  }

  type DeleteMediaResponse {
    acknowledged: Boolean!
    deletedCount: Int!
  }

  extend type Mutation {
    singleFileUpload(singleFileUploadInput: SingleFileUploadInput!): Media!
    deleteMedia(deleteMediaInput: DeleteMediaInput!): DeleteMediaResponse!
  }
`;
