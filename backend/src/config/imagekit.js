const env = require("./env");

function isImageKitConfigured() {
  return Boolean(env.imagekitPrivateKey && env.imagekitPublicKey && env.imagekitUrlEndpoint);
}

module.exports = {
  isImageKitConfigured
};
