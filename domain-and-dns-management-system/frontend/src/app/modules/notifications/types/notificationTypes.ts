export interface Notification {
  notification_id: number
  title: string
  message: string
  source: string
  type: 'success' | 'warning' | 'error' | 'info'
  is_read: boolean
  createdAt: string
  updatedAt: string
}