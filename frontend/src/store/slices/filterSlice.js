const initialState = {
  search: "",
  featured: false,
  category: "",
  stateSlug: ""
};

export function filterReducer(state = initialState, action = {}) {
  switch (action.type) {
    case "filters/set":
      return { ...state, ...(action.payload || {}) };
    case "filters/reset":
      return initialState;
    default:
      return state;
  }
}

export default filterReducer;
