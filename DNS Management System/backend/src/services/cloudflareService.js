import apiClient from "../config/axiosConfig.js";

export const fetchCloudflareDNSRecords = async (zoneId, page=1, limit=100) => {

  const response = await apiClient.get(
    `/zones/${zoneId}/dns_records`,
    {
      params:{
        page,
        per_page:limit
      }
    }
  );

  return response.data.result;
};

const getExternalDnsRecords = async ({type,page, limit}) => {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID3;
  
  const response = await apiClient.get(
    `/zones/${zoneId}/dns_records`, 
    {
    params: {
      ...(type && { type: type.toUpperCase() }),
      page,
      per_page:limit
    }
  });

  return response.data.result.map(record => ({
    id: record.id,
    type: record.type,
    name: record.name,
    value: record.content,
    ttl: record.ttl
  }));

};

export default getExternalDnsRecords;
