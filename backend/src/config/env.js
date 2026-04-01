const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/travelbharat",
  jwtSecret: process.env.JWT_SECRET || "change-me-in-production",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  adminInviteCode: process.env.ADMIN_INVITE_CODE || "",
  imagekitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  imagekitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  imagekitUrlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
  imagekitUploadFolder: process.env.IMAGEKIT_UPLOAD_FOLDER || "/travelbharat/places"
};

module.exports = env;
