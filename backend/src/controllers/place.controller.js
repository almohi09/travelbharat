const Place = require("../models/Place.model");
const State = require("../models/State.model");
const City = require("../models/City.model");
const Category = require("../models/Category.model");
const slugify = require("../utils/slugify");
const getPagination = require("../utils/pagination");
const { ok, fail } = require("../utils/apiResponse");

function parseCsv(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeStringArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }
  return parseCsv(value);
}

function pushModerationEvent(target, event) {
  const nextEvent = {
    status: event.status,
    notes: event.notes || "",
    moderatedBy: event.moderatedBy,
    moderatedAt: event.moderatedAt || new Date()
  };
  target.moderationHistory = Array.isArray(target.moderationHistory) ? target.moderationHistory : [];
  target.moderationHistory.push(nextEvent);
}

async function resolveFilter(query = {}) {
  const filter = {};

  if (query.featured === "true") filter.isFeatured = true;

  if (query.search) {
    const search = String(query.search).trim();
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
  }

  if (query.state) {
    const state = await State.findOne({ slug: String(query.state).trim() }).select("_id");
    filter.state = state ? state._id : null;
  }

  if (query.city) {
    const city = await City.findOne({ slug: String(query.city).trim() }).select("_id");
    filter.city = city ? city._id : null;
  }

  if (query.category) {
    const category = await Category.findOne({ slug: String(query.category).trim() }).select("_id");
    filter.categories = category ? { $in: [category._id] } : { $in: [] };
  }

  if (query.verificationStatus) {
    const allowed = new Set(["pending", "verified", "rejected"]);
    const status = String(query.verificationStatus).trim().toLowerCase();
    if (allowed.has(status)) {
      filter.verificationStatus = status;
    }
  }

  return filter;
}

async function resolvePlacePayload(body = {}, existing = null) {
  const payload = {};

  const name = body.name !== undefined ? String(body.name).trim() : existing?.name;
  if (!name) {
    throw new Error("Place name is required");
  }

  payload.name = name;
  if (!existing || name !== existing.name) {
    payload.slug = slugify(name);
  }

  payload.summary = body.summary !== undefined ? String(body.summary) : existing?.summary || "";
  payload.description = body.description !== undefined ? String(body.description) : existing?.description || "";
  payload.bestTimeToVisit =
    body.bestTimeToVisit !== undefined ? String(body.bestTimeToVisit) : existing?.bestTimeToVisit || "";
  payload.entryFee = body.entryFee !== undefined ? String(body.entryFee) : existing?.entryFee || "";
  payload.timings = body.timings !== undefined ? String(body.timings) : existing?.timings || "";
  payload.mapLink = body.mapLink !== undefined ? String(body.mapLink) : existing?.mapLink || "";
  payload.isFeatured = body.isFeatured !== undefined ? Boolean(body.isFeatured) : Boolean(existing?.isFeatured);

  if (body.images !== undefined) {
    payload.images = normalizeStringArray(body.images);
  } else if (!existing) {
    payload.images = [];
  }

  if (body.nearbyAttractions !== undefined) {
    payload.nearbyAttractions = normalizeStringArray(body.nearbyAttractions);
  } else if (!existing) {
    payload.nearbyAttractions = [];
  }

  if (body.stateSlug !== undefined) {
    const state = await State.findOne({ slug: String(body.stateSlug).trim() });
    if (!state) throw new Error("Invalid state");
    payload.state = state._id;
  } else if (!existing) {
    throw new Error("stateSlug is required");
  }

  if (body.citySlug !== undefined) {
    if (!body.citySlug) {
      payload.city = undefined;
    } else {
      const city = await City.findOne({ slug: String(body.citySlug).trim() });
      if (!city) throw new Error("Invalid city");
      payload.city = city._id;
    }
  }

  if (body.categories !== undefined) {
    const categorySlugs = normalizeStringArray(body.categories);
    if (categorySlugs.length === 0) {
      payload.categories = [];
    } else {
      payload.categories = await Category.find({ slug: { $in: categorySlugs } }).distinct("_id");
    }
  }

  // Any content update should go back to moderation queue unless explicitly moderated.
  if (existing && Object.keys(body).length) {
    payload.verificationStatus = "pending";
    payload.verificationNotes = "";
    payload.verifiedAt = null;
    payload.verifiedBy = undefined;
  }

  return payload;
}

async function getPlaces(req, res) {
  const { page, limit, skip } = getPagination(req.query);
  const filter = await resolveFilter(req.query);
  const [items, total] = await Promise.all([
    Place.find(filter).populate("state city categories").sort({ createdAt: -1 }).skip(skip).limit(limit),
    Place.countDocuments(filter)
  ]);
  return ok(res, { items, page, limit, total }, "Places fetched");
}

async function getPlaceBySlug(req, res) {
  const item = await Place.findOne({ slug: req.params.placeSlug }).populate("state city categories");
  if (!item) return fail(res, "Place not found", 404);
  return ok(res, item, "Place fetched");
}

async function createPlace(req, res) {
  try {
    const payload = await resolvePlacePayload(req.body);
    payload.moderationHistory = [
      {
        status: "pending",
        notes: "Created and awaiting review",
        moderatedBy: req.user?._id,
        moderatedAt: new Date()
      }
    ];
    const place = await Place.create(payload);

    return ok(res, place, "Place created", 201);
  } catch (error) {
    return fail(res, error.message, 400);
  }
}

async function updatePlace(req, res) {
  try {
    const existing = await Place.findById(req.params.id);
    if (!existing) return fail(res, "Place not found", 404);

    const payload = await resolvePlacePayload(req.body, existing);
    payload.moderationHistory = Array.isArray(existing.moderationHistory) ? [...existing.moderationHistory] : [];
    pushModerationEvent(payload, {
      status: "pending",
      notes: "Content updated and queued for review",
      moderatedBy: req.user?._id,
      moderatedAt: new Date()
    });
    const item = await Place.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!item) return fail(res, "Place not found", 404);
    return ok(res, item, "Place updated");
  } catch (error) {
    return fail(res, error.message, 400);
  }
}

async function deletePlace(req, res) {
  const item = await Place.findByIdAndDelete(req.params.id);
  if (!item) return fail(res, "Place not found", 404);
  return ok(res, {}, "Place deleted");
}

async function moderatePlace(req, res) {
  try {
    const status = String(req.body.status || "").trim().toLowerCase();
    if (!["verified", "rejected"].includes(status)) {
      return fail(res, "status must be either 'verified' or 'rejected'", 400);
    }

    const place = await Place.findById(req.params.id);
    if (!place) return fail(res, "Place not found", 404);

    const notes = req.body.notes ? String(req.body.notes) : "";
    place.verificationStatus = status;
    place.verificationNotes = notes;
    place.verifiedAt = new Date();
    place.verifiedBy = req.user?._id;
    pushModerationEvent(place, {
      status,
      notes,
      moderatedBy: req.user?._id,
      moderatedAt: place.verifiedAt
    });
    await place.save();

    return ok(res, place, `Place ${status}`);
  } catch (error) {
    return fail(res, error.message, 400);
  }
}

async function getModerationHistory(req, res) {
  const place = await Place.findById(req.params.id)
    .select("name slug verificationStatus moderationHistory")
    .populate("moderationHistory.moderatedBy", "name email");
  if (!place) return fail(res, "Place not found", 404);
  return ok(res, place, "Moderation history fetched");
}

async function getModerationMetrics(_req, res) {
  const [pending, verified, rejected, recentPlaces] = await Promise.all([
    Place.countDocuments({ verificationStatus: "pending" }),
    Place.countDocuments({ verificationStatus: "verified" }),
    Place.countDocuments({ verificationStatus: "rejected" }),
    Place.find()
      .select("name slug verificationStatus verificationNotes moderationHistory")
      .sort({ updatedAt: -1 })
      .limit(25)
  ]);

  const recentActivity = recentPlaces
    .flatMap((place) =>
      (place.moderationHistory || []).map((entry) => ({
        placeId: place._id,
        placeName: place.name,
        placeSlug: place.slug,
        status: entry.status,
        notes: entry.notes || "",
        moderatedBy: entry.moderatedBy || null,
        moderatedAt: entry.moderatedAt
      }))
    )
    .sort((a, b) => new Date(b.moderatedAt).getTime() - new Date(a.moderatedAt).getTime())
    .slice(0, 20);

  return ok(
    res,
    {
      counts: { pending, verified, rejected, total: pending + verified + rejected },
      recentActivity
    },
    "Moderation metrics fetched"
  );
}

module.exports = {
  getPlaces,
  getPlaceBySlug,
  createPlace,
  updatePlace,
  deletePlace,
  moderatePlace,
  getModerationHistory,
  getModerationMetrics
};
