import { FindAndPaginateModel } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";
import { Media } from "types/generated";
const Schema = mongoose.Schema;

const MediaSchema = new Schema<Media, FindAndPaginateModel>(
  {
    path: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "New Media",
    },
  },
  { timestamps: true }
);

const Media = mongoose.model<Media, FindAndPaginateModel>("Media", MediaSchema);

export { Media };
