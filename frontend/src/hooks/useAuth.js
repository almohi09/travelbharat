import { useEffect, useState } from "react";
import { authAPI } from "../services/api";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const token = localStorage.getItem("tb_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await authAPI.me();
        setUser(res.data?.user || null);
      } catch (error) {
        localStorage.removeItem("tb_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    bootstrap();
  }, []);

  async function login(payload) {
    const res = await authAPI.login(payload);
    localStorage.setItem("tb_token", res.data.token);
    setUser(res.data.user);
    return res;
  }

  async function register(payload) {
    const res = await authAPI.register(payload);
    localStorage.setItem("tb_token", res.data.token);
    setUser(res.data.user);
    return res;
  }

  function logout() {
    localStorage.removeItem("tb_token");
    setUser(null);
  }

  return { user, loading, login, register, logout };
}
