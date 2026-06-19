import cron from 'node-cron'
import { updateDomainStatuses } from '../services/domainStatusService.js'

cron.schedule('5 2 * * *', async () => {
  console.log('⏰ Running Domain Status Job...')

  try {
    const result = await updateDomainStatuses()

    console.log(
      `✅ Domain Status Job completed. Expired Domains updated: ${result.expiredCount}`
    )
  } catch (error) {
    console.error('❌ Domain Status Job failed:', error)
  }
})