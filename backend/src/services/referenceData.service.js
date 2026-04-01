const State = require("../models/State.model");
const City = require("../models/City.model");
const Category = require("../models/Category.model");
const slugify = require("../utils/slugify");
const { statesWithCities, categories } = require("../data/referenceData");

async function seedStatesAndCities() {
  for (const stateRecord of statesWithCities) {
    const stateName = String(stateRecord.name || "").trim();
    if (!stateName) continue;

    const stateSlug = slugify(stateName);
    const state = await State.findOneAndUpdate(
      { slug: stateSlug },
      {
        $setOnInsert: {
          name: stateName,
          slug: stateSlug,
          description: stateRecord.description || ""
        }
      },
      { upsert: true, new: true }
    );

    const cityNames = Array.isArray(stateRecord.cities) ? stateRecord.cities : [];
    for (const cityNameRaw of cityNames) {
      const cityName = String(cityNameRaw || "").trim();
      if (!cityName) continue;
      const citySlug = slugify(`${cityName}-${stateSlug}`);
      await City.findOneAndUpdate(
        { slug: citySlug },
        {
          $setOnInsert: {
            name: cityName,
            slug: citySlug,
            state: state._id
          }
        },
        { upsert: true }
      );
    }
  }
}

async function seedCategories() {
  for (const category of categories) {
    const name = String(category.name || "").trim();
    if (!name) continue;
    const slug = String(category.slug || slugify(name)).trim();
    await Category.findOneAndUpdate(
      { slug },
      {
        $setOnInsert: {
          name,
          slug
        }
      },
      { upsert: true }
    );
  }
}

async function bootstrapReferenceData() {
  await seedStatesAndCities();
  await seedCategories();
}

module.exports = {
  bootstrapReferenceData
};
