import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "https://medicamp-server-app.vercel.app/", // Your Vercel backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Global response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Hook-style export (optional, keeps consistent naming)
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
