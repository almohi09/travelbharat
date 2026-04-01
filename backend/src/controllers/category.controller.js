const Category = require("../models/Category.model");
const Place = require("../models/Place.model");
const slugify = require("../utils/slugify");
const { ok, fail } = require("../utils/apiResponse");

async function getCategories(req, res) {
  const items = await Category.find().sort({ name: 1 });
  return ok(res, items, "Categories fetched");
}

async function createCategory(req, res) {
  try {
    const name = (req.body.name || "").trim();
    const item = await Category.create({ name, slug: slugify(name), icon: req.body.icon || "" });
    return ok(res, item, "Category created", 201);
  } catch (error) {
    return fail(res, error.message, 400);
  }
}

async function getCategoryPlaces(req, res) {
  const category = await Category.findOne({ slug: req.params.category });
  if (!category) return fail(res, "Category not found", 404);
  const places = await Place.find({ categories: category._id }).populate("state city categories");
  return ok(res, places, "Category places fetched");
}

module.exports = { getCategories, createCategory, getCategoryPlaces };
