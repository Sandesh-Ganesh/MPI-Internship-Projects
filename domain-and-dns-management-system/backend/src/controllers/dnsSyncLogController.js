import DNSSyncLog from "../models/DNSSyncLog.js"
import { Op } from "sequelize"
import Domain from "../models/Domain.js"
export const getDNSyncLogs = async (req, res) => {
  try {

    const {
      domain_id,
      status,
      start_date,
      end_date,
      page = 1,
      limit = 10
    } = req.query

    const where = {}

    // Filters

    if (domain_id) {
      where.domain_id = domain_id
    }

    if (status) {
      where.status = status.toUpperCase()
    }

    if (start_date && end_date) {
      where.createdAt = {
        [Op.between]: [new Date(start_date), new Date(end_date)]
      }
    }

    // Pagination
    const offset = (page - 1) * limit

    const { count, rows } = await DNSSyncLog.findAndCountAll({
      include: [
        {
          model: Domain,
          attributes: ["domain_id", "domain_name"]
        },
      ],
      where,
      order: [["createdAt", "DESC"]],
      limit: Number(limit),
      offset: Number(offset)
    })

    return res.status(200).json({
      total: count,
      page: Number(page),
      totalPages: Math.ceil(count / limit),
      logs: rows
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}