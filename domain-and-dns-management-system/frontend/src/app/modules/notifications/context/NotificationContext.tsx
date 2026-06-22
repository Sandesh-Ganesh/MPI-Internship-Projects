import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

import {
  getNotifications,
} from '../api/notificationService'

import {Notification} from '../types/notificationTypes'

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  refreshNotifications: () => Promise<void>
}

const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined)

export const NotificationProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  const refreshNotifications = async () => {
    try {
      const data = await getNotifications()
      setNotifications(data.notifications)
    } catch (error) {
      console.error('Failed to fetch notifications', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshNotifications()
  }, [])

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      'useNotifications must be used inside NotificationProvider'
    )
  }

  return context
}