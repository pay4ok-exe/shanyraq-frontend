import axios from "axios";

const baseURL = "https://shanyraqnew-production.up.railway.app/api";
// const baseURL = "https://45dc765d1a323efcb16c1010b990f3ca.serveo.net/api";
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
