import axios from "axios";
import Dotenv from "./dotenv";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: `${Dotenv.VITE_API_URL}`,
});
api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("auth_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
export default api;
