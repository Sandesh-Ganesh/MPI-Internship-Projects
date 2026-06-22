import cron from "node-cron";
import { syncAllDomainsDnsRecords } from "../services/dnsSyncService.js";
import { createNotification } from "../services/notificationService.js"

export const runDnsSyncJob = async () => {

  console.log("⏰ Running DNS Sync Job...");
  
  try {
    const result = await syncAllDomainsDnsRecords();
    const successCount = result.filter(
      (item) => item.status === 'success'
    ).length

    const failedCount = result.filter(
      (item) => item.status === 'failed'
    ).length

    const totalChanges = result
      .filter((item) => item.status === 'success')
      .reduce((sum, item) => sum + item.changes, 0)

    await createNotification({
      title: 'DNS Sync Completed',
      source: 'DNS_SYNC',
      type: failedCount > 0 ? 'warning' : 'success',
      message: `
        Domains Synced: ${successCount}
        Failed: ${failedCount}
        Records Updated: ${totalChanges}
        `,
    })

    console.log("✅ DNS Sync completed:")//, result)

  } catch (error) {
      await createNotification({
        title: 'DNS Sync Failed',
        source: 'DNS_SYNC',
        type: 'error',
        message: error.message,
      })
    console.error("❌ DNS Sync failed:")
  }
}
cron.schedule("0 2 * * *", runDnsSyncJob);