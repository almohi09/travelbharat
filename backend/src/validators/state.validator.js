const { body } = require("express-validator");

const stateRules = [
  body("name").trim().notEmpty().withMessage("State name is required"),
  body("description").optional().isString().withMessage("description must be a string"),
  body("heroImage").optional().isString().withMessage("heroImage must be a string")
];

module.exports = {
  stateRules
};
