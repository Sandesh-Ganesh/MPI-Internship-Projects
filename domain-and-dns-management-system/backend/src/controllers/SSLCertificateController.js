import SSLCertificate from "../models/SSLCertificate.js"

// Create SSL Certificate
export const createSSLCertificate = async (req, res) => {
  try {

    const {
      domain_id,
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
    } = req.body

    const ssl = await SSLCertificate.create({
      domain_id,
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

    return res.status(201).json({
      message: "SSL Certificate created successfully",
      data: ssl
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

// Get all SSL Certificates
export const getAllSSLCertificates = async (req, res) => {
  try {

    const sslCertificates = await SSLCertificate.findAll()

    return res.status(200).json(sslCertificates)

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

// Get SSL Certificate by ID
export const getSSLCertificateById = async (req, res) => {
  try {

    const { id } = req.params

    const ssl = await SSLCertificate.findByPk(id)

    if (!ssl) {
      return res.status(404).json({
        message: "SSL Certificate not found"
      })
    }

    return res.status(200).json(ssl)

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

// Update SSL Certificate
export const updateSSLCertificate = async (req, res) => {
  try {

    const { id } = req.params

    const ssl = await SSLCertificate.findByPk(id)

    if (!ssl) {
      return res.status(404).json({
        message: "SSL Certificate not found"
      })
    }

    await ssl.update(req.body)

    return res.status(200).json({
      message: "SSL Certificate updated successfully",
      data: ssl
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

// Deactivate SSL Certificate
export const deleteSSLCertificate = async (req, res) => {
  try {

    const { id } = req.params

    const ssl = await SSLCertificate.findByPk(id)

    if (!ssl) {
      return res.status(404).json({
        message: "SSL Certificate not found"
      })
    }

    await ssl.update({
      status: "INACTIVE"
    })

    return res.status(200).json({
      message: "SSL Certificate deactivated successfully"
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}