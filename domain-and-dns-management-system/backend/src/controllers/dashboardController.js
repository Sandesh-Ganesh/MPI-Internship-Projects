import Domain from '../models/Domain.js'
import DNSRecord from '../models/DNSRecord.js'
import SSLCertificate from '../models/SSLCertificate.js'
import Vendor from '../models/Vendor.js'
import Company from '../models/Company.js'
import ActivityLog from '../models/ActivityLog.js'
import { Op } from 'sequelize'

export const getDashboardSummary = async (req, res) => {
  const today = new Date()

const next30Days = new Date()
next30Days.setDate(today.getDate() + 30)

  try {
    const [
      totalDomains,
      totalDNSRecords,
      totalSSLCertificates,
      totalVendors,
      totalCompanies,
      totalSSLs,
      expiringSSLs,
      expiredSSLs
    ] = await Promise.all([
      Domain.count(),
      DNSRecord.count(),
      SSLCertificate.count({
        where:{ status : 'ACTIVE' }
      }),
      Vendor.count(),
      Company.count(),
      SSLCertificate.count({
        where:{ status : 'ACTIVE' }
      }),
      SSLCertificate.count({
        where: {
          status: 'ACTIVE',
          expiry_date: {
            [Op.between]: [today, next30Days]
          }
        }
      }),
      SSLCertificate.count({
        where:{ status : 'EXPIRED' }
      })
    ])

    return res.status(200).json({
      success: true,
      data: {
        totalDomains,
        totalDNSRecords,
        totalSSLCertificates,
        totalVendors,
        totalCompanies,
        expiringSSLs,
        expiredSSLs
      },
    })
  } catch (error) {
    console.error('Dashboard summary error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard summary',
    })
  }
}

export const getRecentActivities = async (req, res) => {
  try {
    const activities = await ActivityLog.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
    })

    return res.status(200).json({
      success: true,
      data: activities,
    })
  } catch (error) {
    console.error('Recent activities error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch recent activities',
    })
  }
}

export const getDashboardAlerts = async (req, res) => {
  try {
    const today = new Date()

    const next30Days = new Date()
    next30Days.setDate(today.getDate() + 30)

    const expiringDomains = await Domain.findAll({
      where: {
        expiry_date: {
          [Op.between]: [today, next30Days],
        },
      },
      limit: 10,
      order: [['expiry_date', 'ASC']],
    })

    const expiringSSLs = await SSLCertificate.count({
      where: {
        expiry_date: {
          [Op.lte]: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      },
    })

    return res.status(200).json({
      success: true,
      data: {
        expiringDomains,
        expiringSSLs,
      },
    })
  } catch (error) {
    console.error('Dashboard alerts error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard alerts',
    })
  }
}
