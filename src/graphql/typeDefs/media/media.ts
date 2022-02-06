import { gql } from "apollo-server-express";

export const TypeDefs = gql`
  scalar Upload

  type Media @key(fields: "_id") {
    _id: ObjectID!
    createdAt: String!
    updatedAt: String!
    path: String!
    mimetype: String!
    created_by: User!
    title: String!
  }

  extend type User @key(fields: "_id") {
    _id: ObjectID! @external
  }

  input CreateMediaInput {
    title: String!
    type: String!
  }

  input SingleFileUploadInput {
    file: Upload!
    title: String!
  }

  input GetMediaInput {
    path: StringFieldFilter
    created_by: StringFieldFilter
    _id: StringFieldFilter
    title: StringFieldFilter
    mimetype: StringFieldFilter
  }

  type GetMediaResponse {
    data: [Media]
    stats: Stats
  }

  extend type Query {
    getMedia(getMediaInput: GetMediaInput!): GetMediaResponse!
  }

  extend type Mutation {
    singleFileUpload(singleFileUploadInput: SingleFileUploadInput!): Media!
  }
`;
