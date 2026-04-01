const jwt = require("jsonwebtoken");
const env = require("../config/env");
const Admin = require("../models/Admin.model");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const payload = jwt.verify(token, env.jwtSecret);
    const admin = await Admin.findById(payload.id).select("-password");
    if (!admin) return res.status(401).json({ success: false, message: "Invalid token" });

    req.user = admin;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
}

module.exports = authMiddleware;
