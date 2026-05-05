import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getDomains = async () => {
  const response = await axios.get(`${API_URL}/domains/domains`)
  return response.data
}

export const getDomainByCompany = async (id: string) => {
  const response = await axios.get(`${API_URL}/domains/domains/company/${id}`)
  return response.data
} 