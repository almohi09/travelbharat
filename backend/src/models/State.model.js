const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
    description: { type: String, default: "" },
    heroImage: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("State", stateSchema);
