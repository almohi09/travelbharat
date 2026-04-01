const env = require("./env");

const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  apiKey: process.env.CLOUDINARY_API_KEY || "",
  apiSecret: process.env.CLOUDINARY_API_SECRET || ""
};

function isCloudinaryConfigured() {
  return Boolean(cloudinaryConfig.cloudName && cloudinaryConfig.apiKey && cloudinaryConfig.apiSecret);
}

function getCloudinaryPublicBaseUrl() {
  if (!isCloudinaryConfigured()) return "";
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
}

module.exports = {
  env,
  cloudinaryConfig,
  isCloudinaryConfigured,
  getCloudinaryPublicBaseUrl
};
