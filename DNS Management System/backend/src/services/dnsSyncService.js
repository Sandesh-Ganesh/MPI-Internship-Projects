import DNSRecord from "../models/DNSRecord.js"
import Domain from "../models/Domain.js"
import { fetchCloudflareDNSRecords } from "./cloudflareService.js"

export const syncDNSRecords = async () => {

  const domains = await Domain.findAll()

  for(const domain of domains){

    if(!domain.zone_id) continue

    const records = await fetchCloudflareDNSRecords(domain.zone_id)

    for(const record of records){
      // upsert means - insert if not exists, update if exists 
      await DNSRecord.upsert({
        domain_id: domain.domain_id,
        provider_record_id: record.id,
        record_type: record.type,
        dns_name: record.name,
        record_value: record.content,
        ttl: record.ttl,
        proxied: record.proxied
      })

    }

  }

};