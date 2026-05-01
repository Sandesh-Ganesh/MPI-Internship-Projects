import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getSSLCertificates = async () => {
  const res = await axios.get(`${API_URL}/ssl-certificates`)
  return res.data
}

export const getSSLCertificateById = async (id: string) => {
  const res = await axios.get(`${API_URL}/ssl-certificates/${id}`)
  return res.data
}

export const createSSLCertificate = async (payload: any) => {
  const res = await axios.post(`${API_URL}/ssl-certificates`, payload)
  return res.data
}

export const updateSSLCertificate = async (id: string, payload: any) => {
  const res = await axios.put(`${API_URL}/ssl-certificates/${id}`, payload)
  return res.data
}

export const deactivateSSLCertificate = async (id: number) => {
  const res = await axios.patch(`${API_URL}/ssl-certificates/${id}`)
  return res.data
}

export const getDomains = async () => {
  const res = await axios.get(`${API_URL}/domains/domains`)
  return res.data
}

export const getVendors = async () => {
  const res = await axios.get(`${API_URL}/vendors/vendors`)
  return res.data
}

export const getControlPanels = async () => {
  const res = await axios.get(`${API_URL}/controlPanels/control-panels`)
  return res.data
}
