const express = require("express");
const { getCategories, createCategory, getCategoryPlaces } = require("../controllers/category.controller");
const auth = require("../middlewares/auth.middleware");
const adminGuard = require("../middlewares/adminGuard.middleware");

const router = express.Router();

router.get("/", getCategories);
router.get("/:category/places", getCategoryPlaces);
router.post("/", auth, adminGuard, createCategory);

module.exports = router;
