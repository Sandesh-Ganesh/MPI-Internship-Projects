import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.CLOUDFLARE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;


