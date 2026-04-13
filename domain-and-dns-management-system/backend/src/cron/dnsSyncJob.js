import cron from "node-cron";
import { syncAllDomainsDnsRecords } from "../services/dnsSyncService.js";

cron.schedule("0 2 * * *", async () => {
  console.log("⏰ Running DNS Sync Job...");

  try {
    const result = await syncAllDomainsDnsRecords();
    console.log("✅ DNS Sync completed:", result);
  } catch (error) {
    console.error("❌ DNS Sync failed:", error);
  }
});