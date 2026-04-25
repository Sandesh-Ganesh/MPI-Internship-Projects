import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getCompanies = async () => {
  const res = await axios.get(`${API_URL}/company/companies`)
  return res.data
}

export const getVendors = async () => {
  const res = await axios.get(`${API_URL}/vendors/vendors`)
  return res.data
}

export const getCostCenters = async () => {
  const res = await axios.get(`${API_URL}/costCenters/costCenters`)
  return res.data
}