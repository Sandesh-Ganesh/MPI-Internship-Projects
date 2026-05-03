import DNSRecord from "../models/DNSRecord.js" 
import { getDnsRecords } from "./dnsService.js" 
import Domain from "../models/Domain.js" 
import DNSSyncLog from "../models/DNSSyncLog.js"
import DNSChangeLog from "../models/DNSChangeLog.js"

export const syncDnsRecords = async (domainId) => {

  const externalRecords = await getDnsRecords({
    domainId,
    format: false
  })

  // 🔥 Get all DB records once
  const dbRecords = await DNSRecord.findAll({
    where: { domain_id: domainId }
  })

  const dbMap = new Map(
    dbRecords.map((r) => [r.provider_record_id, r])
  )

  const processedIds = new Set()
  const results = []

  for (const record of externalRecords) {

    const existing = dbMap.get(record.id)

    const data = {
      domain_id: domainId,
      provider_record_id: record.id,
      dns_name: record.name,
      record_type: record.type,
      record_value: record.content,
      ttl: record.ttl,
      proxied: record.proxied,
    }

    if (existing) {
      processedIds.add(record.id)

      const oldData = existing.toJSON()

      const normalize = (val) =>
        typeof val === "string" ? val.trim().toLowerCase() : val

      //Detect change
      const hasChanged =
        normalize(oldData.dns_name) !== normalize(data.dns_name) ||
        normalize(oldData.record_type) !== normalize(data.record_type) ||
        normalize(oldData.record_value) !== normalize(data.record_value) ||
        oldData.ttl !== data.ttl ||
        oldData.proxied !== data.proxied

      if (hasChanged) {
        await existing.update(data)

        // LOG UPDATE
        await DNSChangeLog.create({
          domain_id: domainId,
          provider_record_id: record.id,
          action: "UPDATE",
          old_value: oldData,
          new_value: data,
        })

        results.push({ status: "updated", id: existing.dns_id })
      }

    } else {
      const newRecord = await DNSRecord.create(data)

      processedIds.add(record.id)

      // LOG CREATE
      await DNSChangeLog.create({
        domain_id: domainId,
        provider_record_id: record.id,
        action: "CREATE",
        new_value: data,
      })

      results.push({ status: "created", id: newRecord.dns_id })
    }
  }

  // Detect deleted records
  for (const dbRecord of dbRecords) {
    if (!processedIds.has(dbRecord.provider_record_id)) {

      const oldData = dbRecord.toJSON()

      await DNSChangeLog.create({
        domain_id: domainId,
        provider_record_id: dbRecord.provider_record_id,
        action: "DELETE",
        old_value: oldData,
      })

      await dbRecord.destroy()

      results.push({ status: "deleted", id: dbRecord.dns_id })
    }
  }

  return results
}

export const syncAllDomainsDnsRecords = async () => {

  const domains = await Domain.findAll() 
  
  if (!domains.length) {
    throw new Error("No domains found") 
  }
  
  const results = []

  for (const domain of domains) {

    try {
      console.log(`Syncing domain: ${ domain.domain_name} (ID: ${domain.domain_id})`)

      const res = await syncDnsRecords(domain.domain_id)
      
      // Log
      await DNSSyncLog.create({
        domain_id: domain.domain_id,
        status: "SUCCESS",
        records_fetched: res.length
      })

      results.push({
        domainId: domain.domain_id,
        status: "success",
        changes: res.length
      })

    } catch (error) {

      console.error(`Error syncing domain ${domain.id}:`, error.message)

      await DNSSyncLog.create({
        domain_id: domain.domain_id,
        status: "FAILED",
        error_message: error.message
      })


      results.push({
        domainId: domain.domain_id,
        status: "failed",
        error: error.message
      })
    }
  }
  return results
}