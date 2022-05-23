import { gql } from "apollo-server-express";

export const Query = gql`
  input GetMediaInput {
    query: MediaFieldFiltersInput!
    config: FilterConfig
  }

  input MediaFieldFiltersInput {
    path: [StringFieldFilter]
    created_by: [StringFieldFilter]
    _id: [StringFieldFilter]
    title: [StringFieldFilter]
    mimetype: [StringFieldFilter]
    createdAt: [DateFieldFilter]
    updatedAt: [DateFieldFilter]
  }

  type GetMediaResponse {
    data: [Media!]!
    stats: Stats!
  }

  extend type Query {
    getMedia(getMediaInput: GetMediaInput!): GetMediaResponse!
  }
`;
