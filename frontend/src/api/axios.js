
import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-monitor-81wd.onrender.com"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const res = await axios.post("https://expense-monitor-81wd.onrender.com/api/auth/refresh",{refreshToken});
        localStorage.setItem("accessToken", res.data.accessToken);
        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
