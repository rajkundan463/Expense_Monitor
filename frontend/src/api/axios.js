import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api"
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const response = await axios.post("http://localhost:5000/api/auth/refresh", { refreshToken });
        localStorage.setItem("accessToken", response.data.accessToken);
        error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;