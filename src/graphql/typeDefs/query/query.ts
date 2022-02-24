import { gql } from "apollo-server-express";

export const Query = gql`
  input GetMediaInput {
    path: StringFieldFilter
    created_by: StringFieldFilter
    _id: StringFieldFilter
    title: StringFieldFilter
    mimetype: StringFieldFilter
    createdAt: StringFieldFilter
    updatedAt: StringFieldFilter
    config: FilterConfig
  }

  type GetMediaResponse {
    data: [Media!]!
    stats: Stats!
  }

  extend type Query {
    getMedia(getMediaInput: GetMediaInput!): GetMediaResponse!
  }
`;
