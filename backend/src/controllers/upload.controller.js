const { ok, fail } = require("../utils/apiResponse");
const { uploadToImageKit } = require("../services/imagekit.service");

async function uploadPlaceImages(req, res) {
  try {
    const files = Array.isArray(req.files) ? req.files : [];
    if (!files.length) {
      return fail(res, "No files provided", 400);
    }

    const folder = req.body.folder || undefined;
    const tags = [];
    if (req.body.placeName) tags.push(`place:${String(req.body.placeName).trim().toLowerCase()}`);
    if (req.body.stateSlug) tags.push(`state:${String(req.body.stateSlug).trim().toLowerCase()}`);

    const uploads = await Promise.all(
      files.map((file) =>
        uploadToImageKit({
          buffer: file.buffer,
          mimeType: file.mimetype,
          originalName: file.originalname,
          folder,
          tags
        })
      )
    );

    return ok(res, { items: uploads }, "Images uploaded", 201);
  } catch (error) {
    return fail(res, error.message, 400);
  }
}

module.exports = {
  uploadPlaceImages
};
