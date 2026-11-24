import axios from "axios";

const defaultApiUrl = import.meta.env.DEV
  ? "http://localhost:5000/api"
  : "https://cf-compass-2bxb.onrender.com/api";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL?.trim() || defaultApiUrl,
  timeout: 70000,
});

export default API;
