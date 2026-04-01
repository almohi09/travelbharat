import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("tb_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export const statesAPI = {
  getAll: (params) => API.get('/states', { params }),
  getBySlug: (stateSlug) => API.get(`/states/${stateSlug}`),
  getPlaces: (stateSlug, params) => API.get(`/states/${stateSlug}/places`, { params }),
  getCities: (stateSlug) => API.get(`/states/${stateSlug}/cities`)
};

export const placesAPI = {
  getAll: (params) => API.get('/places', { params }),
  getBySlug: (placeSlug) => API.get(`/places/${placeSlug}`),
  getFeatured: () => API.get("/places", { params: { featured: true, limit: 8 } })
};

export const categoriesAPI = {
  getAll: () => API.get('/categories'),
  getPlaces: (category, params) => API.get(`/categories/${category}/places`, { params })
};

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  me: () => API.get('/auth/me')
};

export const adminAPI = {
  createState: (data) => API.post("/states", data),
  createCity: (data) => API.post("/cities", data),
  createCategory: (data) => API.post("/categories", data),
  createPlace: (data) => API.post('/places', data),
  updatePlace: (id, data) => API.put(`/places/${id}`, data),
  deletePlace: (id) => API.delete(`/places/${id}`),
  moderatePlace: (id, data) => API.patch(`/places/${id}/moderate`, data),
  getModerationMetrics: () => API.get("/places/moderation/metrics"),
  getModerationHistory: (id) => API.get(`/places/${id}/moderation-history`),
  uploadImages: (formData) =>
    API.post("/uploads/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
};

export default API;
