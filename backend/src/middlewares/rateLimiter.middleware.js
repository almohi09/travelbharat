const rateLimit = require("express-rate-limit");

function createApiRateLimiter(options = {}) {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000,
    max: options.max || 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests, please try again later."
    }
  });
}

module.exports = createApiRateLimiter;
