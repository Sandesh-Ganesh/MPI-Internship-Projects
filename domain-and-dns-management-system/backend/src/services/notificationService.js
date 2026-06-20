import Notification from '../models/Notification.js'

export const createNotification = async ({
  title,
  message,
  type = 'info',
  source,
}) => {
  return await Notification.create({
    title,
    message,
    type,
    source,
  })
}