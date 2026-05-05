import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getCostCenters = async () => {
  const res = await axios.get(`${API_URL}/cost-centers`)
  return res.data
}

export const getCostCenterById = async (id: string) => {
  const res = await axios.get(`${API_URL}/cost-centers/${id}`)
  return res.data
}

export const createCostCenter = async (data: any) => {
  const res = await axios.post(`${API_URL}/cost-centers`, data)
  return res.data
}

export const updateCostCenter = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/cost-centers/${id}`, data)
  return res.data
}

export const deleteCostCenter = async (id: string) => {
  const res = await axios.delete(`${API_URL}/cost-centers/${id}`)
  return res.data
}

export const getCostCentersByCompany = async (companyId: string) => {
  const res = await axios.get(`${API_URL}/cost-centers/company/${companyId}`)
  return res.data
} 