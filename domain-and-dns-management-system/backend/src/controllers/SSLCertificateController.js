import SSLCertificate from "../models/SSLCertificate.js"
import Domain from "../models/Domain.js"

//Create SSL Certificate + attach domains

export const createSSLCertificate = async (req, res) => {
  try {
    const {
      ssl_name,
      cert_type,
      validation_type,
      encryption_type,
      registered_date,
      expiry_date,
      vendor_id,
      control_panel_id,
      requested_by,
      approved_by,
      remarks,
      status,
      domain_ids // array of domain IDs
    } = req.body

    const ssl = await SSLCertificate.create({
      ssl_name,
      cert_type,
      validation_type,
      encryption_type,
      registered_date,
      expiry_date,
      vendor_id,
      control_panel_id,
      requested_by,
      approved_by,
      remarks,
      status
    })

    // 🔗 Attach domains (many-to-many)
    if (domain_ids && domain_ids.length > 0) {
      const domains = await Domain.findAll({
        where: { id: domain_ids }
      })

      await ssl.setDomains(domains)
    }

    return res.status(201).json({
      success: true,
      message: "SSL Certificate created successfully",
      data: ssl
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//Get all SSL Certificates (with domains)
export const getAllSSLCertificates = async (req, res) => {
  try {
    const sslCertificates = await SSLCertificate.findAll({
      include: [
        {
          model: Domain,
          as: "domains",
          attributes: ["id", "name"]
        }
      ],
      order: [["createdAt", "DESC"]]
    })

    return res.status(200).json({
      success: true,
      data: sslCertificates
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get single SSL Certificate

export const getSSLCertificateById = async (req, res) => {
  try {
    const { id } = req.params

    const ssl = await SSLCertificate.findByPk(id, {
      include: [
        {
          model: Domain,
          as: "domains",
          attributes: ["id", "name"]
        }
      ]
    })

    if (!ssl) {
      return res.status(404).json({
        success: false,
        message: "SSL Certificate not found"
      })
    }

    return res.status(200).json({
      success: true,
      data: ssl
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//Update SSL Certificate + domains
export const updateSSLCertificate = async (req, res) => {
  try {
    const { id } = req.params
    const {
      ssl_name,
      cert_type,
      validation_type,
      encryption_type,
      registered_date,
      expiry_date,
      vendor_id,
      control_panel_id,
      requested_by,
      approved_by,
      remarks,
      status,
      domain_ids
    } = req.body

    const ssl = await SSLCertificate.findByPk(id)

    if (!ssl) {
      return res.status(404).json({
        success: false,
        message: "SSL Certificate not found"
      })
    }

    await ssl.update({
      ssl_name,
      cert_type,
      validation_type,
      encryption_type,
      registered_date,
      expiry_date,
      vendor_id,
      control_panel_id,
      requested_by,
      approved_by,
      remarks,
      status
    })

    // Update domain mapping
    if (domain_ids) {
      const domains = await Domain.findAll({
        where: { id: domain_ids }
      })

      await ssl.setDomains(domains)
    }

    return res.status(200).json({
      success: true,
      message: "SSL Certificate updated successfully",
      data: ssl
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Delete SSL Certificate
export const deleteSSLCertificate = async (req, res) => {
  try {
    const { id } = req.params

    const ssl = await SSLCertificate.findByPk(id)

    if (!ssl) {
      return res.status(404).json({
        success: false,
        message: "SSL Certificate not found"
      })
    }

    await ssl.destroy()

    return res.status(200).json({
      success: true,
      message: "SSL Certificate deleted successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}