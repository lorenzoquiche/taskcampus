import axios from "axios";

export const TOKEN_STORAGE_KEY = "taskcampus_token";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default http;
