import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getCompanies = async () => {
  const res = await axios.get(`${API_URL}/companies`)
  return res.data
}

export const getCompanyById = async (id: string) => {
  const res = await axios.get(`${API_URL}/companies/${id}`)
  return res.data
}

export const createCompany = async (data: any) => {
  const res = await axios.post(`${API_URL}/companies`, data)
  return res.data
}

export const updateCompany = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/companies/${id}`, data)
  return res.data
}

export const deleteCompany = async (id: string) => {
  const res = await axios.delete(`${API_URL}/companies/${id}`)
  return res.data
}