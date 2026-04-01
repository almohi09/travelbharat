const express = require("express");
const auth = require("../middlewares/auth.middleware");
const adminGuard = require("../middlewares/adminGuard.middleware");
const upload = require("../middlewares/upload.middleware");
const { uploadPlaceImages } = require("../controllers/upload.controller");

const router = express.Router();

router.post("/images", auth, adminGuard, upload.array("images", 10), uploadPlaceImages);

module.exports = router;
