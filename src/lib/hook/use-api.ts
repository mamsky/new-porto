import axios from "axios";
import Cookie from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookie.get("token");
    config.headers = config.headers ?? {};

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
