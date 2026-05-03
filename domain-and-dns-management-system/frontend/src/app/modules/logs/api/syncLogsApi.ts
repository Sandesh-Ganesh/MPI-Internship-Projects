import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getSyncLogs = async (params:any) => {
  const response = await axios.get(`${API_URL}/dns-sync-logs`, { params })
  return response.data
}