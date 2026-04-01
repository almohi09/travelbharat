const env = require("../config/env");
const { isImageKitConfigured } = require("../config/imagekit");
const slugify = require("../utils/slugify");

function toDataUri(buffer, mimeType) {
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}

function buildFileName(name = "image") {
  const base = slugify(name) || "image";
  return `${base}-${Date.now()}`;
}

async function uploadToImageKit({ buffer, mimeType, originalName, folder, tags = [] }) {
  if (!isImageKitConfigured()) {
    throw new Error("ImageKit is not configured. Set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY and IMAGEKIT_URL_ENDPOINT.");
  }

  const form = new FormData();
  form.append("file", toDataUri(buffer, mimeType || "application/octet-stream"));
  form.append("fileName", buildFileName(originalName));
  form.append("useUniqueFileName", "true");
  form.append("folder", folder || env.imagekitUploadFolder);

  if (tags.length) {
    form.append("tags", tags.join(","));
  }

  const authToken = Buffer.from(`${env.imagekitPrivateKey}:`).toString("base64");
  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authToken}`
    },
    body: form
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Image upload failed");
  }

  return {
    fileId: data.fileId,
    name: data.name,
    url: data.url,
    thumbnailUrl: data.thumbnailUrl || "",
    size: data.size,
    width: data.width,
    height: data.height
  };
}

module.exports = {
  uploadToImageKit
};
