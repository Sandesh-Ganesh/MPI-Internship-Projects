import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getDNSChangeLogs = async (params?: any) => {
  const response = await axios.get(
    `${API_URL}/dns-change-logs`,
    { params }
  )
  return response.data
}