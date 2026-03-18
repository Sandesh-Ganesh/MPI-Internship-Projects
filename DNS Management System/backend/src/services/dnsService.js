import Domain from "../models/Domain.js";
import { fetchDnsFromCloudflare } from "./cloudflareService.js";

export const getDnsRecords = async({ domainId, type, page=1, limit=100, format=true }) => {

  if (!domainId) {
    throw new Error("domain Id is required");
  }
  const domain = await Domain.findByPk(domainId);

  if (!domain) {
    throw new Error("Domain not found");
  }

  const { zone_id, api_token } = domain;

  const records = await fetchDnsFromCloudflare({
    zone_id,
    api_token,
    type,
    page,
    limit
  });

  if (!format) return records;

  return records.map(record => ({
    id: record.id,
    type: record.type,
    name: record.name,
    value: record.content,
    ttl: record.ttl
  }));
};