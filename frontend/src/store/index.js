const store = {
  auth: {
    user: null,
    loading: false
  },
  filters: {
    search: "",
    featured: false
  },
  places: {
    items: [],
    loading: false,
    error: ""
  }
};

export default store;
