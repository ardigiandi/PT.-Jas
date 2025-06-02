import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api-ptjas-production.up.railway.app",
});
// http://127.0.0.1:8000

export default axiosInstance;
