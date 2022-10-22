import { InputMaybe, Media, TransformOptions } from "types/generated";
import { createSignature } from "./create-signature";

export const determineSrc = (
  media: Media,
  transform?: InputMaybe<TransformOptions>
) => {
  if (
    media.mimetype.includes("image") &&
    process.env.ENABLE_IMGPROXY === "true"
  ) {
    return createSignature(media.path, transform);
  }
  return encodeURI(process.env.FILE_SERVER_BASE_URL + media.path);
};

export const createSrc = (
  media: Media[] | Media,
  transform?: InputMaybe<TransformOptions>
) => {
  if (Array.isArray(media)) {
    const formatted = [];

    for (const m of media) {
      const src = determineSrc(m, transform);
      m.src = src;
      formatted.push(m);
    }
    return formatted;
  }

  const src = determineSrc(media);
  media.src = src;
  return media;
};
