const { body } = require("express-validator");

const placeRules = [
  body("name").trim().notEmpty().withMessage("Place name is required"),
  body("stateSlug").trim().notEmpty().withMessage("stateSlug is required"),
  body("summary").optional().isString().withMessage("summary must be a string"),
  body("description").optional().isString().withMessage("description must be a string"),
  body("bestTimeToVisit").optional().isString().withMessage("bestTimeToVisit must be a string"),
  body("entryFee").optional().isString().withMessage("entryFee must be a string"),
  body("timings").optional().isString().withMessage("timings must be a string"),
  body("mapLink").optional().isString().withMessage("mapLink must be a string")
];

module.exports = {
  placeRules
};
