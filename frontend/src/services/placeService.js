import { placesAPI } from "./api";

export const placeService = {
  list: (params) => placesAPI.getAll(params),
  getBySlug: (slug) => placesAPI.getBySlug(slug),
  featured: () => placesAPI.getFeatured()
};

export default placeService;
