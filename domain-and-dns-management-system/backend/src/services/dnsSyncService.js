import DNSRecord from "../models/DNSRecord.js" 
import { getDnsRecords } from "./dnsService.js" 
import Domain from "../models/Domain.js" 
export const syncDnsRecords = async (domainId) => {

  const externalRecords = await getDnsRecords({
    domainId,
    format: false
  }) 

  // console.log("External Record - ",domainId,"\n",externalRecords)

  const results = [] 

  for (const record of externalRecords) {

    const existing = await DNSRecord.findOne({
      where: { provider_record_id: record.id }
    }) 

    const data = {
      domain_id: domainId,
      provider_record_id: record.id,
      dns_name:record.name,
      record_type: record.type,
      record_value: record.content,
      ttl: record.ttl,
      proxied:record.proxied,
      createdAt:record.created_on,
      updatedAt:record.modified_on,
    } 

    if (existing) {
      await existing.update(data) 
      results.push({ status: "updated", id: existing.dns_id}) 
    } else {
      const newRecord = await DNSRecord.create(data) 
      results.push({ status: "created", id: newRecord.id }) 
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

      results.push({
        domainId: domain.domain_id,
        status: "success",
        changes: res.length
      })

    } catch (error) {

      console.error(`Error syncing domain ${domain.id}:`, error.message)

      results.push({
        domainId: domain.domain_id,
        status: "failed",
        error: error.message
      })
    }
  }
  
  return results
}