const express = require("express");
const { searchPlaces } = require("../controllers/search.controller");

const router = express.Router();

router.get("/", searchPlaces);

module.exports = router;
