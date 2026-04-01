import { statesAPI } from "./api";

export const stateService = {
  list: (params) => statesAPI.getAll(params),
  getBySlug: (slug) => statesAPI.getBySlug(slug),
  getPlaces: (slug, params) => statesAPI.getPlaces(slug, params),
  getCities: (slug) => statesAPI.getCities(slug)
};

export default stateService;
