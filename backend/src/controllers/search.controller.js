const Place = require("../models/Place.model");
const State = require("../models/State.model");
const City = require("../models/City.model");
const Category = require("../models/Category.model");
const { ok } = require("../utils/apiResponse");

async function searchPlaces(req, res) {
  const q = (req.query.q || "").trim();
  if (!q) return ok(res, [], "Search query is empty");

  const [states, cities, categories] = await Promise.all([
    State.find({ $or: [{ name: { $regex: q, $options: "i" } }, { slug: { $regex: q, $options: "i" } }] }).select("_id"),
    City.find({ $or: [{ name: { $regex: q, $options: "i" } }, { slug: { $regex: q, $options: "i" } }] }).select("_id"),
    Category.find({ $or: [{ name: { $regex: q, $options: "i" } }, { slug: { $regex: q, $options: "i" } }] }).select(
      "_id"
    )
  ]);

  const stateIds = states.map((item) => item._id);
  const cityIds = cities.map((item) => item._id);
  const categoryIds = categories.map((item) => item._id);

  const items = await Place.find({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { summary: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      ...(stateIds.length ? [{ state: { $in: stateIds } }] : []),
      ...(cityIds.length ? [{ city: { $in: cityIds } }] : []),
      ...(categoryIds.length ? [{ categories: { $in: categoryIds } }] : [])
    ]
  })
    .populate("state city categories")
    .limit(25);

  return ok(res, items, "Search results");
}

module.exports = { searchPlaces };
