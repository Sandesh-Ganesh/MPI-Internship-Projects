import { Op } from "sequelize"
import {
  Domain,
  SSLCertificate,
  DNSSyncLog,
  DNSRecord,
  Vendor,
  Company,
  Notification,
} from "../models/index.js"

export const getDomainExpiryReport = async () => {
  const today = new Date()

  const next30Days = new Date()
  next30Days.setDate(next30Days.getDate() + 30)

  const totalDomains = await Domain.count()

  const activeDomains = await Domain.count({
    where: {
      expiry_date: {
        [Op.gt]: today,
      },
    },
  })

  const expiredDomains = await Domain.count({
    where: {
      expiry_date: {
        [Op.lt]: today,
      },
    },
  })

  const expiringDomains = await Domain.findAll({
    where: {
      expiry_date: {
        [Op.between]: [today, next30Days],
      },
    },
    order: [["expiry_date", "ASC"]],
  })

  return {
    totalDomains,
    activeDomains,
    expiredDomains,
    expiringWithin30Days: expiringDomains.length,
    domains: expiringDomains,
  }
}

export const getSslExpiryReport = async () => {
  const today = new Date()

  const next30Days = new Date()
  next30Days.setDate(next30Days.getDate() + 30)

  const totalSsl = await SSLCertificate.count()

  const activeSsl = await SSLCertificate.count({
    where: {
      expiry_date: {
        [Op.gt]: today,
      },
    },
  })

  const expiredSsl = await SSLCertificate.count({
    where: {
      expiry_date: {
        [Op.lt]: today,
      },
    },
  })

  const expiringSsl = await SSLCertificate.findAll({
    where: {
      expiry_date: {
        [Op.between]: [today, next30Days],
      },
    },
    order: [["expiry_date", "ASC"]],
  })

  return {
    totalSsl,
    activeSsl,
    expiredSsl,
    expiringWithin30Days: expiringSsl.length,
    certificates: expiringSsl,
  }
}

export const getDnsSyncReport = async () => {
  const totalSyncs = await DNSSyncLog.count()

  const successfulSyncs = await DNSSyncLog.count({
    where: {
      status: "SUCCESS",
    },
  })

  const failedSyncs = await DNSSyncLog.count({
    where: {
      status: "FAILED",
    },
  })

  const lastSync = await DNSSyncLog.findOne({
    order: [["createdAt", "DESC"]],
  })

  return {
    totalSyncs,
    successfulSyncs,
    failedSyncs,
    lastSyncDate: lastSync?.createdAt || null,
  }
}

export const getOverviewReport = async () => {
  const [
    totalDomains,
    totalDnsRecords,
    totalSslCertificates,
    totalVendors,
    totalCompanies,
    totalNotifications,
  ] = await Promise.all([
    Domain.count(),
    DNSRecord.count(),
    SSLCertificate.count(),
    Vendor.count(),
    Company.count(),
    Notification.count(),
  ])

  return {
    totalDomains,
    totalDnsRecords,
    totalSslCertificates,
    totalVendors,
    totalCompanies,
    totalNotifications,
  }
}