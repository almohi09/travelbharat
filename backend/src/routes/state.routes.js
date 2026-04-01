const express = require("express");
const { getStates, getStateBySlug, createState, getStatePlaces } = require("../controllers/state.controller");
const { getCitiesByState } = require("../controllers/city.controller");
const auth = require("../middlewares/auth.middleware");
const adminGuard = require("../middlewares/adminGuard.middleware");

const router = express.Router();

router.get("/", getStates);
router.get("/:stateSlug", getStateBySlug);
router.get("/:stateSlug/places", getStatePlaces);
router.get("/:stateSlug/cities", getCitiesByState);
router.post("/", auth, adminGuard, createState);

module.exports = router;
