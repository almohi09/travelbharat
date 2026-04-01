const express = require("express");
const { createCity } = require("../controllers/city.controller");
const auth = require("../middlewares/auth.middleware");
const adminGuard = require("../middlewares/adminGuard.middleware");

const router = express.Router();

router.post("/", auth, adminGuard, createCity);

module.exports = router;
