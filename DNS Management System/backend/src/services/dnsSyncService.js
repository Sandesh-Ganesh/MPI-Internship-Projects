import DNSRecord from "../models/DNSRecord.js";
import { getDnsRecords } from "./dnsService.js";

export const syncDnsRecords = async (domainId) => {

  const externalRecords = await getDnsRecords({
    domainId,
    format: false
  });

  const results = [];

  for (const record of externalRecords) {

    const existing = await DNSRecord.findOne({
      where: { external_id: record.id }
    });

    const data = {
      external_id: record.id,
      domain_id: domainId,
      type: record.type,
      name: record.name,
      value: record.content,
      ttl: record.ttl,
    };

    if (existing) {
      await existing.update(data);
      results.push({ status: "updated", id: existing.id });
    } else {
      const newRecord = await DNSRecord.create(data);
      results.push({ status: "created", id: newRecord.id });
    }
  }

  return results;
};