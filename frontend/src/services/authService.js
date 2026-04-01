import { authAPI } from "./api";

export const authService = {
  login: (payload) => authAPI.login(payload),
  register: (payload) => authAPI.register(payload),
  me: () => authAPI.me()
};

export default authService;
