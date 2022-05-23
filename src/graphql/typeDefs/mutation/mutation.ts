import { gql } from "apollo-server-express";

export const Mutation = gql`
  scalar Upload

  input CreateMediaInput {
    payload: MediaPayloadInput!
  }

  input UpdateMediaInput {
    payload: MediaPayloadInput!
    query: MediaFieldFiltersInput!
  }

  input MediaPayloadInput {
    file: Upload!
    title: String!
  }

  input DeleteMediaInput {
    query: MediaFieldFiltersInput!
  }

  type DeleteMediaResponse {
    deletedCount: Int!
  }

  extend type Mutation {
    createMedia(createMediaInput: CreateMediaInput!): Media!
    deleteMedia(deleteMediaInput: DeleteMediaInput!): DeleteMediaResponse!
  }
`;
