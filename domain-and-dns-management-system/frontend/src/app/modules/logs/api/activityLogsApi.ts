import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getActivityLogs = async (params?: any) => {
  const response = await axios.get(`${API_URL}/activity-logs`,{
    params,
  })
  return response.data
}