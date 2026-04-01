const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");
const env = require("../config/env");
const { ok, fail } = require("../utils/apiResponse");

function signToken(admin) {
  return jwt.sign({ id: admin._id, role: admin.role }, env.jwtSecret, { expiresIn: "7d" });
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const exists = await Admin.findOne({ email: (email || "").toLowerCase() });
    if (exists) return fail(res, "Email already exists", 409);

    const admin = await Admin.create({ name, email, password });
    return ok(res, { token: signToken(admin), user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } }, "Registered", 201);
  } catch (error) {
    return fail(res, error.message, 400);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: (email || "").toLowerCase() });
    if (!admin) return fail(res, "Invalid credentials", 401);

    const valid = await admin.comparePassword(password || "");
    if (!valid) return fail(res, "Invalid credentials", 401);

    return ok(res, { token: signToken(admin), user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } }, "Logged in");
  } catch (error) {
    return fail(res, error.message, 400);
  }
}

function me(req, res) {
  return ok(res, { user: req.user }, "Current user");
}

module.exports = { register, login, me };
