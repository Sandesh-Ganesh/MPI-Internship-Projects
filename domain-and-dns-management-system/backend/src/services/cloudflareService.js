import apiClient from "../config/axiosConfig.js";

export const fetchDnsFromCloudflare = async ({
  zone_id,
  api_token,
  type,
  page = 1,
  limit = 100
}) => {
  const response = await apiClient.get(
    `/zones/${zone_id}/dns_records`,
    {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
      params: {
        ...(type && { type: type.toUpperCase() }),
        page,
        per_page: limit,
      },
    }
  );
  return response.data.result;
};
