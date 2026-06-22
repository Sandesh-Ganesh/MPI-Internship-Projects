import { Notification } from "../models/index.js"

export const getNotifications = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      source,
      type,
    } = req.query

    const where = {}

    if (source) where.source = source
    if (type) where.type = type

    const offset = (Number(page) - 1) * Number(limit)

    const { count, rows } =
      await Notification.findAndCountAll({
        where,
        order: [["createdAt", "DESC"]],
        limit: Number(limit),
        offset,
      })

    return res.status(200).json({
      notifications: rows,
      total: count,
      page: Number(page),
      totalPages: Math.ceil(count / Number(limit)),
    })
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