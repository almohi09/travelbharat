const { fail } = require("../utils/apiResponse");

function errorHandler(err, _req, res, _next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error";
  return fail(res, message, status);
}

module.exports = errorHandler;
