import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-monitor-81wd.onrender.com/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return Promise.reject(err);

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          { refreshToken }
        );

        localStorage.setItem("accessToken", res.data.accessToken);
        err.config.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return api(err.config);
      } catch {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;