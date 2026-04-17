import ActivityLog from "../models/ActivityLog.js"
import { Op } from "sequelize"

export const getActivityLogs = async (req, res) => {
  try {
    const {
      user_id,
      entity_id,
      log_type,
      action,
      start_date,
      end_date,
      page = 1,
      limit = 20
    } = req.query

    const where = {}

    //Filter
    if (user_id) where.user_id = user_id
    if (entity_id) where.entity_id = entity_id
    if (log_type) where.log_type = log_type
    if (action) where.action = action

    //Date range filter
    if (start_date || end_date) {
      where.createdAt = {}
      if (start_date) where.createdAt[Op.gte] = new Date(start_date)
      if (end_date) where.createdAt[Op.lte] = new Date(end_date)
    }

    //Pagination
    const offset = (page - 1) * limit

    const { count, rows } = await ActivityLog.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    })

    return res.status(200).json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      logs: rows
    })
  } catch (error) {
    console.error("Error fetching activity logs:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}