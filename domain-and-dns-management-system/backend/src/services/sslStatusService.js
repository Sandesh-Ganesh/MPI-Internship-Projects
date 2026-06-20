import { Op } from 'sequelize'
import SSLCertificate from '../models/SSLCertificate.js'

export const updateSSLStatuses = async () => {
  const updated = await SSLCertificate.update(
    {
      status: 'EXPIRED',
    },
    {
      where: {
        status: 'ACTIVE',
        expiry_date: {
          [Op.lt]: new Date(),
        },
      },
    }
  )

  return {
    expiredCount: updated[0],
  }
}