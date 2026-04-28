import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

export const getDNSRecords = async ( domainId?: string,
  page: number = 1,
  limit: number = 10) => {
  let url = `${API_URL}/records/dns-records?page=${page}&limit=${limit}`
  if (domainId) { 
    url += `&domainId=${domainId}`
  }
  const res= await axios.get(url)
  return res.data
}

export const getDomains = async () => {
  const res = await axios.get(`${API_URL}/domains/domains`)
  return res.data
}

export const syncAllDomains = async () => {
  const res = await axios.get(`${API_URL}/records/sync-all`)
  return res.data
}

export const syncDomain = async (domainId: number) => {
  const res = await axios.get(`${API_URL}/records/sync/${domainId}`)
  return res.data
}