import * as reportService from "../services/reportService.js"
import { Parser } from "json2csv"

export const getDomainExpiryReport = async (req, res) => {
  try {
    const report = await reportService.getDomainExpiryReport()

    res.status(200).json({
      success: true,
      data: report,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getSslExpiryReport = async (req, res) => {
  try {
    const report = await reportService.getSslExpiryReport()

    res.status(200).json({
      success: true,
      data: report,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getDnsSyncReport = async (req, res) => {
  try {
    const report = await reportService.getDnsSyncReport()

    res.status(200).json({
      success: true,
      data: report,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getOverviewReport = async (req, res) => {
  try {
    const report = await reportService.getOverviewReport()

    res.status(200).json({
      success: true,
      data: report,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const exportDomainExpiryCsv = async (req, res) => {
  try {
    const fields = ["Domain", "ExpiryDate"]

    const report = await reportService.getDomainExpiryReport()
  
    const parser = new Parser({fields})

    const csv = parser.parse(
      report.domains.map((domain) => ({
        Domain: domain.domain_name,
        ExpiryDate: domain.expiry_date,
      }))
    )
    
    res.header("Content-Type", "text/csv")
    res.attachment("domain-expiry-report.csv")

    return res.send(csv)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const exportSslExpiryCsv = async (req, res) => {
  try {
    const report =
      await reportService.getSslExpiryReport()
    
    const fields = ["Domain", "ExpiryDate"]

    const parser = new Parser({fields})

    const csv = parser.parse(
      report.certificates.map((ssl) => ({
        Domain: ssl.domain_name,
        ExpiryDate: ssl.expiry_date,
      }))
    )

    res.header("Content-Type", "text/csv")
    res.attachment("ssl-expiry-report.csv")

    return res.send(csv)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}