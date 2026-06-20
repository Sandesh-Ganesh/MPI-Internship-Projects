import { Notification } from "../models/index.js"

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      order: [["createdAt", "DESC"]],
      limit: 20,
    })

    return res.status(200).json(notifications)
  } catch (error) {
    console.error("Get Notifications Error:", error)

    return res.status(500).json({
      message: "Failed to fetch notifications",
    })
  }
}

export const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params

    const notification = await Notification.findByPk(id)

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      })
    }

    notification.is_read = true

    await notification.save()

    return res.status(200).json({
      message: "Notification marked as read",
    })
  } catch (error) {
    console.error("Mark Notification Read Error:", error)

    return res.status(500).json({
      message: "Failed to update notification",
    })
  }
}

export const markAllNotificationsRead = async (req, res) => {
  try {
    await Notification.update(
      { is_read: true },
      {
        where: {
          is_read: false,
        },
      }
    )

    return res.status(200).json({
      message: "All notifications marked as read",
    })
  } catch (error) {
    console.error("Mark All Notifications Error:", error)

    return res.status(500).json({
      message: "Failed to update notifications",
    })
  }
}