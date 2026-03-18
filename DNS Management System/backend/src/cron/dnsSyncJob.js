import cron from "node-cron"
import { syncAllDomainsDnsRecords } from "../services/dnsSyncService.js"

cron.schedule("0 2 * * *", async () => {

  console.log("Running DNS Sync Job")

  await syncAllDomainsDnsRecords()

})