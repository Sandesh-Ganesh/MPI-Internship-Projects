import { Op } from 'sequelize'
import Domain from '../models/Domain.js'

export const updateDomainStatuses = async () => {
  const updated = await Domain.update(
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