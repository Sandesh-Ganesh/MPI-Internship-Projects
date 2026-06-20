import {useEffect, useState} from 'react'
import {getNotifications} from '../api/notificationService'
import {Notification} from '../types/notificationTypes'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications()
      setNotifications(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length

  return {
    notifications,
    unreadCount,
    loading,
    refreshNotifications: fetchNotifications,
  }
}