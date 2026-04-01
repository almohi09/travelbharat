const State = require("../models/State.model");
const Place = require("../models/Place.model");
const slugify = require("../utils/slugify");
const getPagination = require("../utils/pagination");
const { ok, fail } = require("../utils/apiResponse");

async function getStates(req, res) {
  const { page, limit, skip } = getPagination(req.query);
  const [items, total] = await Promise.all([
    State.find().sort({ name: 1 }).skip(skip).limit(limit),
    State.countDocuments()
  ]);
  return ok(res, { items, page, limit, total }, "States fetched");
}

async function getStateBySlug(req, res) {
  const item = await State.findOne({ slug: req.params.stateSlug });
  if (!item) return fail(res, "State not found", 404);
  return ok(res, item, "State fetched");
}

async function createState(req, res) {
  try {
    const name = (req.body.name || "").trim();
    const state = await State.create({
      name,
      slug: slugify(name),
      description: req.body.description || "",
      heroImage: req.body.heroImage || ""
    });
    return ok(res, state, "State created", 201);
  } catch (error) {
    return fail(res, error.message, 400);
  }
}

async function getStatePlaces(req, res) {
  const state = await State.findOne({ slug: req.params.stateSlug });
  if (!state) return fail(res, "State not found", 404);

  const places = await Place.find({ state: state._id }).populate("city categories").sort({ createdAt: -1 });
  return ok(res, places, "State places fetched");
}

module.exports = { getStates, getStateBySlug, createState, getStatePlaces };
