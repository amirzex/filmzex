import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL ||
  "https://67bde069321b883e790e53c8.mockapi.io";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL.replace(/\/$/, ""),
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any common headers or auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
