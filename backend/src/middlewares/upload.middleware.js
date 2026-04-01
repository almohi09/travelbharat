const multer = require("multer");

const storage = multer.memoryStorage();

const imageMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/jpg"]);

function fileFilter(_req, file, cb) {
  if (!imageMimeTypes.has(file.mimetype)) {
    cb(new Error("Only JPG, PNG and WEBP images are allowed"));
    return;
  }
  cb(null, true);
}

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10
  },
  fileFilter
});

module.exports = upload;
