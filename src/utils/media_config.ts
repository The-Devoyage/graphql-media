import { MediaConfig } from "types/media-config";

export const generateMediaConfig = (mediaConfigBuffer: Buffer): MediaConfig => {
  const config = JSON.parse(mediaConfigBuffer.toString());
  return config;
};
