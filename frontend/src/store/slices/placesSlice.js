const initialState = {
  items: [],
  loading: false,
  error: ""
};

export function placesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case "places/setItems":
      return { ...state, items: Array.isArray(action.payload) ? action.payload : [] };
    case "places/setLoading":
      return { ...state, loading: Boolean(action.payload) };
    case "places/setError":
      return { ...state, error: action.payload || "" };
    default:
      return state;
  }
}

export default placesReducer;
