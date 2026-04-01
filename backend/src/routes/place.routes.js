const express = require("express");
const {
  getPlaces,
  getPlaceBySlug,
  createPlace,
  updatePlace,
  deletePlace,
  moderatePlace,
  getModerationHistory,
  getModerationMetrics
} = require("../controllers/place.controller");
const auth = require("../middlewares/auth.middleware");
const adminGuard = require("../middlewares/adminGuard.middleware");

const router = express.Router();

router.get("/", getPlaces);
router.get("/moderation/metrics", auth, adminGuard, getModerationMetrics);
router.get("/:id/moderation-history", auth, adminGuard, getModerationHistory);
router.get("/:placeSlug", getPlaceBySlug);
router.post("/", auth, adminGuard, createPlace);
router.patch("/:id/moderate", auth, adminGuard, moderatePlace);
router.put("/:id", auth, adminGuard, updatePlace);
router.delete("/:id", auth, adminGuard, deletePlace);

module.exports = router;
