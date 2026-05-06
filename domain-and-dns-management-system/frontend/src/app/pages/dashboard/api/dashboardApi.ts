import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getSummary = async () => {
  const res = await axios.get(`${API_URL}/dashboard/summary`)
  return res.data
}

export const getRecentActivities = async () => {
  const res = await axios.get(`${API_URL}/dashboard/recent-activities`)
  return res.data
}

export const getAlerts = async () => {
  const res = await axios.get(`${API_URL}/dashboard/alerts`)
  return res.data
}