import { runDnsSyncJob } from "./dnsSyncJob.js"
import { runDomainStatusJob } from "./domainStatusJob.js"
import { runSSLStatusJob } from "./sslStatusJob.js"

export const runAllJobs = async () => {
  await runDnsSyncJob()
  await runDomainStatusJob()
  await runSSLStatusJob()

  console.log("✅ All jobs completed")
}