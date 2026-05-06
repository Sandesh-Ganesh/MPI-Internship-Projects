import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/users`)
  return res.data
}

export const updateUser = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/users/${id}`, data)
  return res.data
}

export const getUsersDropdown = async () => {
  const res = await axios.get(`${API_URL}/users/dropdown`)
  return res.data
}