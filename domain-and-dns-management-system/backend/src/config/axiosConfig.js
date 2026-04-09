import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.CLOUDFLARE_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default apiClient;


