import axios from "axios";

const baseURL = "https://2bd2ef502c659adf62565e6e5ed9c7eb.serveo.net/api";
const axiosInstance = axios.create({
  baseURL: baseURL, // Base URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add token to request headers if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
