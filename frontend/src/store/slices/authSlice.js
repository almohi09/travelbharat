const initialState = {
  user: null,
  loading: false
};

export function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case "auth/setUser":
      return { ...state, user: action.payload || null };
    case "auth/setLoading":
      return { ...state, loading: Boolean(action.payload) };
    default:
      return state;
  }
}

export default authReducer;
