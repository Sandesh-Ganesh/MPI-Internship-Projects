import cron from 'node-cron'
import { updateSSLStatuses } from '../services/sslStatusService.js'
import { createNotification } from "../services/notificationService.js"

export const runSSLStatusJob =  async () => {
  console.log('⏰ Running SSL Status Job...')

  try {
    const result = await updateSSLStatuses()
    await createNotification({
      title: 'SSL Status Check',
      source: 'SSL_STATUS',
      type:
        result.expiredCount > 0
          ? 'warning'
          : 'success',
      message: `Expired SSL Certificates Updated: ${result.expiredCount}`,
    })
    console.log(
      `✅ SSL Status Job completed. Expired SSLs updated: ${result.expiredCount}`
    )

  } catch (error) {
    await createNotification({
      title: 'SSL Status Job Failed',
      source: 'SSL_STATUS',
      type: 'error',
      message: error.message,
    })
    console.error('❌ SSL Status Job failed:', error)
  }
}

cron.schedule('0 2 * * *',runSSLStatusJob);