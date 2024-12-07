import axios from "axios";

const baseURL = "https://shanyraqnew-production.up.railway.app/api";
// const baseURL = "https://057f633e9e69f456e52f14339669e7d8.serveo.net/api";
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
