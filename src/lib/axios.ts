import axios from "axios";
import Dotenv from "./dotenv";

const api = axios.create({
  baseURL: `${Dotenv.VITE_API_URL}`,
});

export default api;
