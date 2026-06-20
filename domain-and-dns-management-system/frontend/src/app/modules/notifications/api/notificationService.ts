import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_API_URL

export const getNotifications = async () => {
  const res = await axios.get(`${API_URL}/notifications`)
  return res.data
}

export const markNotificationRead = async (
  notificationId: number
) => {
  const res = await axios.patch(
    `${API_URL}/notifications/${notificationId}/read`
  )

  return res.data
}

export const markAllNotificationsRead = async () => {
  const res = await axios.patch(
    `${API_URL}/notifications/read-all`
  )

  return res.data
}