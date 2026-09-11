import { useEffect, useState } from "react";
import http, { TOKEN_STORAGE_KEY } from "../api/http.js";
import AuthContext from "./AuthContext.js";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() =>
    Boolean(localStorage.getItem(TOKEN_STORAGE_KEY)),
  );

  const clearSession = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  const saveSession = (session) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, session.token);
    setToken(session.token);
    setUser(session.user);
    return session;
  };

  useEffect(() => {
    if (!token) return;

    let active = true;

    http.get("/auth/me")
      .then(({ data }) => {
        if (active) setUser(data.user);
      })
      .catch(() => {
        if (active) clearSession();
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token]);

  const register = async (credentials) => {
    const { data } = await http.post("/auth/register", credentials);
    return saveSession(data);
  };

  const login = async (credentials) => {
    const { data } = await http.post("/auth/login", credentials);
    return saveSession(data);
  };

  const logout = () => clearSession();

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
