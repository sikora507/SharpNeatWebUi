import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const apiClient = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
