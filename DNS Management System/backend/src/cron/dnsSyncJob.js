import cron from "node-cron"
// import { syncDNSRecords } from "../services/dnsSyncService.js"

cron.schedule("0 2 * * *", async () => {

  console.log("Running DNS Sync Job")

  // await syncDNSRecords()

})