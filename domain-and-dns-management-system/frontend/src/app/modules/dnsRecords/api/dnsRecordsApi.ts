import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getDNSRecords = async () => {
  const response = await axios.get(`${API_URL}/records/dns-records`)
  return response.data
}