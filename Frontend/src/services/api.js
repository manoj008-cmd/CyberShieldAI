import axios from "axios";

const api = axios.create({
  baseURL: "https://cybershieldai-rsrr.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;