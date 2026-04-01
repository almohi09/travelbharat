const express = require("express");
const stateRoutes = require("./state.routes");
const cityRoutes = require("./city.routes");
const placeRoutes = require("./place.routes");
const categoryRoutes = require("./category.routes");
const searchRoutes = require("./search.routes");
const authRoutes = require("./auth.routes");
const uploadRoutes = require("./upload.routes");

const router = express.Router();

router.use("/states", stateRoutes);
router.use("/cities", cityRoutes);
router.use("/places", placeRoutes);
router.use("/categories", categoryRoutes);
router.use("/search", searchRoutes);
router.use("/auth", authRoutes);
router.use("/uploads", uploadRoutes);

module.exports = router;
