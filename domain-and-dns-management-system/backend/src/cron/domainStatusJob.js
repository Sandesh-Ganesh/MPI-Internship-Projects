import cron from 'node-cron'
import { updateDomainStatuses } from '../services/domainStatusService.js'
import { createNotification } from "../services/notificationService.js"

export const runDomainStatusJob = async () => {
  console.log('⏰ Running Domain Status Job...')

  try {
    const result = await updateDomainStatuses()
    await createNotification({
      title: 'Domain Status Check',
      source: 'DOMAIN_STATUS',
      type:
        result.expiredCount > 0
          ? 'warning'
          : 'success',
      message: `
        Expired Domains Updated: ${result.expiredCount}
        `,
    })
    console.log(
      `✅ Domain Status Job completed. Expired Domains updated: ${result.expiredCount}`
    )
  } catch (error) {
    await createNotification({
      title: 'Domain Status Job Failed',
      source: 'DOMAIN_STATUS',
      type: 'error',
      message: error.message,
    })
    console.error('❌ Domain Status Job failed:', error)
  }
}

cron.schedule('5 2 * * *', runDomainStatusJob);