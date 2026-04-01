const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    summary: { type: String, default: "" },
    description: { type: String, default: "" },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    images: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    bestTimeToVisit: { type: String, default: "" },
    entryFee: { type: String, default: "" },
    timings: { type: String, default: "" },
    mapLink: { type: String, default: "" },
    nearbyAttractions: [{ type: String }],
    verificationStatus: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
    verificationNotes: { type: String, default: "" },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    verifiedAt: { type: Date },
    moderationHistory: [
      {
        status: { type: String, enum: ["pending", "verified", "rejected"], required: true },
        notes: { type: String, default: "" },
        moderatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
        moderatedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);
