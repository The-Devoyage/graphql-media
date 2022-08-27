import { gql } from "apollo-server-express";

export const Query = gql`
  input GetMediaInput {
    query: MediaFieldFiltersInput!
    config: FilterConfig
    transform: TransformOptions
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

  enum ResizingTypeEnum {
    FILL
    FIT
    FILL_DOWN
    FORCE
    AUTO
  }

  input TransformResizeInput {
    resizing_type: ResizingTypeEnum
    width: Int
    height: Int
    enlarge: Boolean
    extend: Boolean
  }

  enum GravityEnum {
    SM
    NO
    SO
    EA
    WE
    NOWE
    NOEA
    SOWE
    SOEA
    CE
  }

  enum ExtensionEnum {
    PNG
    JPG
    JPEG
    SVG
    WEBP
    AVIF
    GIF
    ICO
    BMP
    TIFF
  }

  input TransformOptions {
    resize: TransformResizeInput
    gravity: GravityEnum
    extension: ExtensionEnum
  }

  type GetMediaResponse {
    data: [Media!]!
    stats: Stats!
  }

  extend type Query {
    getMedia(getMediaInput: GetMediaInput!): GetMediaResponse!
  }
`;
