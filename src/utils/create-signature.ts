import { ApolloError } from "apollo-server-express";
import createHmac from "create-hmac";
import { TransformOptions } from "types/generated";

type ImgProxyPath = string;

const urlSafeBase64 = (buffer: Buffer | string) => {
  return Buffer.from(buffer)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const hexDecode = (hex: string) => Buffer.from(hex, "hex");

const sign = (salt: string, target: string, secret: string) => {
  const hmac = createHmac("sha256", hexDecode(secret));
  hmac.update(hexDecode(salt));
  hmac.update(target);
  return urlSafeBase64(hmac.digest());
};

export const createSignature = (
  originalPath: string,
  transformOptions?: TransformOptions | null
): ImgProxyPath => {
  const KEY = process.env.IMGPROXY_KEY;
  const SALT = process.env.IMGPROXY_SALT;
  const FILE_SERVER_BASE_URL = process.env.FILE_SERVER_BASE_URL;
  const IMGPROXY_SERVER_URL = process.env.IMGPROXY_SERVER_URL;

  if (!KEY || !SALT || !FILE_SERVER_BASE_URL || !IMGPROXY_SERVER_URL) {
    throw new ApolloError(
      "Missing image proxy configuration.",
      "MISSING_IMG_PROXY_CONFIG",
      {
        key: !!KEY,
        salt: !!SALT,
        baseUrl: !!FILE_SERVER_BASE_URL,
        imageProxyServerUrl: !!IMGPROXY_SERVER_URL,
      }
    );
  }

  const url = FILE_SERVER_BASE_URL + originalPath;
  const encoded_url = "/" + urlSafeBase64(url);

  let resizePath = "";
  if (transformOptions?.resize) {
    const resizing_type =
      transformOptions.resize.resizing_type?.toLowerCase().replace("_", "-") ??
      "fill";
    const width = transformOptions.resize.width ?? 500;
    const height = transformOptions.resize.height ?? 500;
    const enlarge = transformOptions.resize.enlarge ?? false;
    const extend = transformOptions.resize.extend ?? false;
    resizePath = `/rs:${resizing_type}:${width}:${height}:${enlarge}:${extend}`;
  }

  let gravityPath = "";
  if (transformOptions?.gravity) {
    gravityPath = `/g:${transformOptions?.gravity?.toLowerCase() ?? "ce"}`;
  }

  const origianlExtension = originalPath.split(".").pop();

  if (transformOptions?.extension === "SVG" && origianlExtension !== "svg") {
    throw new Error(
      "Imgproxy supports SVG sources without limitations, but SVG results are not supported when the source image is not SVG. Source ImgProxy Docs."
    );
  }

  const extensionPath = `.${
    transformOptions?.extension?.toLowerCase() ?? origianlExtension
  }`;

  const path = `${resizePath}${gravityPath}${encoded_url}${extensionPath}`;

  const signature = sign(SALT, path, KEY);

  const result = `${IMGPROXY_SERVER_URL}/${signature}${path}`;

  return result;
};
