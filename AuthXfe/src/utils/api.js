import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL;
const Port = import.meta.env.VITE_API_PORT;

const api = axios.create({
  baseURL: `http://20.55.42.170:3000/api`,
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          `http://20.55.42.170:3000/auth/refresh`,
          {
            refreshToken,
          }
        );
        if (response.data.accessToken) {
          localStorage.setItem("token", response.data.accessToken);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        console.error("Refresh token failed:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/"; // Redirect to login page
      }
    }
  }
);

export default api;
