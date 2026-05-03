import DNSChangeLog from "../models/DNSChangeLog.js"
import { Op } from "sequelize"
import Domain from "../models/Domain.js"

export const getAllDNSChangeLogs = async (req, res) => {
  try {
    const {
      domain_id,
      action,
      start_date,
      end_date,
      page = 1,
      limit = 20
    } = req.query

    const where = {}

    if (domain_id) where.domain_id = domain_id
    if (action) where.action = action

    if (start_date || end_date) {
      where.createdAt = {}
      if (start_date) where.createdAt[Op.gte] = new Date(start_date)
      if (end_date) where.createdAt[Op.lte] = new Date(end_date)
    }

    const offset = (page - 1) * limit

    const { count, rows } = await DNSChangeLog.findAndCountAll({
      include: [
        {
          model: Domain,
          as: "domain",
          attributes: ["domain_name"],
        },
      ],
      where,
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    })

    return res.status(200).json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      logs: rows
    })
  } catch (error) {
    console.error("Error fetching DNS change logs:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const getDNSChangeLogsByDomain = async (req, res) => {
  try {
    const { domainId } = req.params

    const logs = await DNSChangeLog.findAll({
      include: [
        {
          model: Domain,
          as: "domain",
          attributes: ["domain_name"],
        },
      ],
      where: { domain_id: domainId },
      order: [["createdAt", "DESC"]],
    })

    return res.status(200).json(logs)
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}