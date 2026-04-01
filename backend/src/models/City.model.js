const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);
