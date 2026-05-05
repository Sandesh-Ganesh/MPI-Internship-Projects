import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getVendors = async () => {
  const res = await axios.get(`${API_URL}/vendors`)
  return res.data
}

export const getVendorById = async (id: string) => {
  const res = await axios.get(`${API_URL}/vendors/${id}`)
  return res.data
}

export const createVendor = async (data: any) => {
  const res = await axios.post(`${API_URL}/vendors`, data)
  return res.data
}

export const updateVendor = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/vendors/${id}`, data)
  return res.data
}

export const deleteVendor = async (id: string) => {
  const res = await axios.delete(`${API_URL}/vendors/${id}`)
  return res.data
}