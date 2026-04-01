const City = require("../models/City.model");
const State = require("../models/State.model");
const slugify = require("../utils/slugify");
const { ok, fail } = require("../utils/apiResponse");

async function getCitiesByState(req, res) {
  const state = await State.findOne({ slug: req.params.stateSlug });
  if (!state) return fail(res, "State not found", 404);
  const items = await City.find({ state: state._id }).sort({ name: 1 });
  return ok(res, items, "Cities fetched");
}

async function createCity(req, res) {
  try {
    const state = await State.findOne({ slug: req.body.stateSlug });
    if (!state) return fail(res, "Invalid state", 400);

    const name = (req.body.name || "").trim();
    const item = await City.create({
      name,
      slug: slugify(`${name}-${state.slug}`),
      state: state._id
    });
    return ok(res, item, "City created", 201);
  } catch (error) {
    return fail(res, error.message, 400);
  }
}

module.exports = { getCitiesByState, createCity };
