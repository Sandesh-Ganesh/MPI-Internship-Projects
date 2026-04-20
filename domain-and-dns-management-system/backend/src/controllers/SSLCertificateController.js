import SSLCertificate from "../models/SSLCertificate.js"
import ActivityLog from "../models/ActivityLog.js"


// CREATE SSL (with renewal handling)
export const createSSLCertificate = async (req, res) => {
  try {

    const data = req.body

    // find existing active SSL for this domain
    const oldSSL = await SSLCertificate.findOne({
      where: {
        domain_id: data.domain_id,
        status: "ACTIVE"
      }
    })

    // deactivate old SSL if exists
    if (oldSSL) {
      await oldSSL.update({ status: "INACTIVE" })
    }

    // create new SSL with parent link
    const newSSL = await SSLCertificate.create({
      ...data,
      parent_ssl_id: oldSSL ? oldSSL.ssl_id : null
    })
    console.log(req.user?.userID)
    // Activity Log
    await ActivityLog.create({
      log_type: "SSL",
      entity_id: newSSL.ssl_id,
      user_id: req.user?.userId,   
      action: "CREATE",
      old_value: oldSSL ? oldSSL.toJSON() : null,
      new_value: newSSL.toJSON()
    })

    return res.status(201).json({
      message: "SSL created successfully",
      data: newSSL
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}



// GET ALL SSL CERTIFICATES
export const getAllSSLCertificates = async (req, res) => {
  try {

    const data = await SSLCertificate.findAll()

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

    const ssl = await SSLCertificate.findByPk(id)

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

    const ssl = await SSLCertificate.findByPk(id)

    if (!ssl) {
      return res.status(404).json({
        message: "SSL not found"
      })
    }

    const oldData = ssl.toJSON()

    await ssl.update(updates)

    // Activity Log
    await ActivityLog.create({
      log_type: "SSL",
      entity_id: ssl.ssl_id,
      user_id: req.user?.id,
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
      user_id: req.user?.id,
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