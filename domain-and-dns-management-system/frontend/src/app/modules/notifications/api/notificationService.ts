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

export const getNotificationsPaginated = async (
  page = 1,
  limit = 20,
  source = '',
  type = ''
) => {
  const params = new URLSearchParams()

  params.append('page', page.toString())
  params.append('limit', limit.toString())

  if (source) params.append('source', source)
  if (type) params.append('type', type)

  const res = await axios.get(
    `${API_URL}/notifications?${params.toString()}`
  )

  return res.data
}