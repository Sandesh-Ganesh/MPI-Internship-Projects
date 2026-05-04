import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getControlPanels = async () => {
  const res = await axios.get(`${API_URL}/control-panels`)
  return res.data
}

export const getControlPanelById = async (id: string) => {
  const res = await axios.get(`${API_URL}/control-panels/${id}`)
  return res.data
}

export const createControlPanel = async (data: any) => {
  const res = await axios.post(`${API_URL}/control-panels`, data)
  return res.data
}

export const updateControlPanel = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/control-panels/${id}`, data)
  return res.data
}

export const deleteControlPanel = async (id: string) => {
  const res = await axios.delete(`${API_URL}/control-panels/${id}`)
  return res.data
}