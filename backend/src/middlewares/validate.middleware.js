const { validationResult } = require("express-validator");
const { fail } = require("../utils/apiResponse");

function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  return fail(
    res,
    "Validation failed",
    422,
    result.array().map((item) => ({
      field: item.path,
      message: item.msg
    }))
  );
}

module.exports = validate;
