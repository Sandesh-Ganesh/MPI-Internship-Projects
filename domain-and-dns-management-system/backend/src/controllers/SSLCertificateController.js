import SSLCertificate from "../models/SSLCertificate.js"
import ActivityLog from "../models/ActivityLog.js"
import Domain from "../models/Domain.js"
import Vendor from "../models/Vendor.js"
import ControlPanel from "../models/ControlPanel.js"
import User from "../models/User.js"
import { sequelize } from "../config/database.js"

// CREATE SSL (with renewal handling)
export const createSSLCertificate = async (req, res) => {
  const t = await sequelize.transaction()

  try {

    const data = req.body

    if (!data.domain_id) {
      await t.rollback()
      return res.status(400).json({ message: "domain_id is required" })
    }

    const domain = await Domain.findByPk(data.domain_id, { transaction: t })

    if (!domain) {
      await t.rollback()
      return res.status(404).json({
        message: "Domain does not exist"
      })
    }

    // find existing active SSL for this domain
    const oldSSL = await SSLCertificate.findOne({
      where: {
        domain_id: data.domain_id,
        status: "ACTIVE"
      },
      transaction: t,
      lock: t.LOCK.UPDATE
    })

    // deactivate old SSL if exists
    if (oldSSL) {
      await oldSSL.update({ status: "RENEWED" }, { transaction: t })
    }

    // create new SSL with parent link
    const newSSL = await SSLCertificate.create({
      ...data,
      status: "ACTIVE",
      parent_ssl_id: oldSSL?.ssl_id || null
    }, { transaction: t })

    // Activity Log
    await ActivityLog.create({
      log_type: "SSL",
      entity_id: newSSL.ssl_id,
      user_id: req.user?.userID,
      action: "CREATE",
      old_value: oldSSL ? oldSSL.toJSON() : null,
      new_value: newSSL.toJSON()
    }, { transaction: t })

    await t.commit()

    return res.status(201).json({
      message: "SSL created successfully",
      data: newSSL
    })

  } catch (error) {
    await t.rollback()
    return res.status(500).json({
      message: error.message
    })
  }
}



// GET ALL SSL CERTIFICATES
export const getAllSSLCertificates = async (req, res) => {
  try {

    const data = await SSLCertificate.findAll({
      include: [
        {
          model: Domain,
          attributes: ["domain_id", "domain_name"],
        },
        {
          model: Vendor,
          attributes: ["vendor_id", "vendor_name"],
        },
        {
          model: ControlPanel,
          attributes: ["control_panel_id", "panel_name"],
        },
        {
          model: User,
          as: "requester",
          attributes: ["user_id", "username"],
        },
        {
          model: User,
          as: "approver",
          attributes: ["user_id", "username"],
        }
      ],
      order: [["ssl_id", "DESC"]],
    })

    return res.status(200).json(data)

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}



// GET SSL BY ID
export const getSSLCertificateById = async (req, res) => {
  try {

    const { id } = req.params

    const ssl = await SSLCertificate.findByPk(id, {
      include: [
        {
          model: Domain,
          attributes: ["domain_id", "domain_name"],
        },
        {
          model: Vendor,
          attributes: ["vendor_id", "vendor_name"],
        },
        {
          model: ControlPanel,
          attributes: ["control_panel_id", "panel_name"],
        },
        {
          model: User,
          as: "requester",
          attributes: ["user_id", "username"],
        },
        {
          model: User,
          as: "approver",
          attributes: ["user_id", "username"],
        }
      ],
    })

    if (!ssl) {
      return res.status(404).json({
        message: "SSL not found"
      })
    }

    return res.status(200).json(ssl)

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}



// UPDATE SSL
export const updateSSLCertificate = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const allowedUpdates = [
      "vendor_id",
      "control_panel_id",
      "approved_by",
      "remarks"
    ]

    const filteredUpdates = {}

    for (let key of allowedUpdates) {
      if (updates[key] !== undefined) {
        filteredUpdates[key] = updates[key]
      }
    }

    const ssl = await SSLCertificate.findByPk(id)

    if (!ssl) {
      return res.status(404).json({
        message: "SSL not found"
      })
    }

    const oldData = ssl.toJSON()

    console.log("OLD:", oldData)
    console.log("NEW:", filteredUpdates)

    //  Check if anything actually changed
    let hasChanges = false

    for (let key of Object.keys(filteredUpdates)) {
      if (oldData[key] !== filteredUpdates[key]) {
        hasChanges = true
        break
      }
    }

    // No changes → skip update + log
    if (!hasChanges) {
      return res.status(200).json({
        message: "No changes detected",
        data: ssl
      })
    }

    // Apply update
    await ssl.update(filteredUpdates)

    // Log ONLY if changed
    await ActivityLog.create({
      log_type: "SSL",
      entity_id: ssl.ssl_id,
      user_id: req.user?.userID,
      action: "UPDATE",
      old_value: oldData,
      new_value: ssl.toJSON()
    })

    return res.status(200).json({
      message: "SSL updated successfully",
      data: ssl
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}



// SOFT DELETE SSL
export const deleteSSLCertificate = async (req, res) => {
  try {

    const { id } = req.params

    const ssl = await SSLCertificate.findByPk(id)

    if (!ssl) {
      return res.status(404).json({
        message: "SSL not found"
      })
    }

    const oldData = ssl.toJSON()

    await ssl.update({
      status: "INACTIVE"
    })

    // 📝 Activity Log
    await ActivityLog.create({
      log_type: "SSL",
      entity_id: ssl.ssl_id,
      user_id: req.user?.userID,
      action: "DELETE",
      old_value: oldData
    })

    return res.status(200).json({
      message: "SSL deactivated successfully"
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const getSSLCertificateTimeline = async (req, res) => {
  try {
    const { id } = req.params

    const currentSSL = await SSLCertificate.findByPk(id)

    if (!currentSSL) {
      return res.status(404).json({ message: "SSL not found" })
    }

    const timeline = await SSLCertificate.findAll({
      where: { domain_id: currentSSL.domain_id },
      include: [
        {
          model: Domain,
          attributes: ["domain_id", "domain_name"]
        },
        {
          model: Vendor,
          attributes: ["vendor_id", "vendor_name"]
        },
        {
          model: ControlPanel,
          attributes: ["control_panel_id", "panel_name"]
        },
        {
          model: User,
          as: "requester",
          attributes: ["user_id", "username"]
        },
        {
          model: User,
          as: "approver",
          attributes: ["user_id", "username"]
        }
      ],
      order: [["ssl_id", "DESC"]] 
    })

    return res.status(200).json(timeline)

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const getActiveSSLPerDomain = async (req, res) => {
  try {
    const { domainId } = req.params

    const ssl = await SSLCertificate.findOne({
      where: {
        domain_id: domainId,
        status: "ACTIVE"
      },
      include: [
        {
          model: Domain,
          attributes: ["domain_id", "domain_name"]
        },
        {
          model: Vendor,
          attributes: ["vendor_id", "vendor_name"]
        },
        {
          model: ControlPanel,
          attributes: ["control_panel_id", "panel_name"]
        },
        {
          model: User,
          as: "requester",
          attributes: ["user_id", "username"]
        },
        {
          model: User,
          as: "approver",
          attributes: ["user_id", "username"]
        }
      ]
    })

    if (!ssl) {
      return res.status(404).json({
        message: "No active SSL found for this domain"
      })
    }

    return res.status(200).json(ssl)

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}
