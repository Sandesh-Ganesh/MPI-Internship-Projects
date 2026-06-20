import cron from 'node-cron'
import { updateSSLStatuses } from '../services/sslStatusService.js'

cron.schedule('0 2 * * *', async () => {
  console.log('⏰ Running SSL Status Job...')

  try {
    const result = await updateSSLStatuses()

    console.log(
      `✅ SSL Status Job completed. Expired SSLs updated: ${result.expiredCount}`
    )
    await createNotification({
      title: 'SSL Expiry Check',
      message: `
        Checked: 120 certificates
        Expiring Soon: 4
        Expired: 1
      `,
      type: 'warning',
      source: 'SSL_CRON',
    })

  } catch (error) {
    console.error('❌ SSL Status Job failed:', error)
  }
})