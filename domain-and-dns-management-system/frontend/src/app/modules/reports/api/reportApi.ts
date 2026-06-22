import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_API_URL

export const getOverviewReport = async () => {
  const res = await axios.get(
    `${API_URL}/reports/overview`
  )

  return res.data
}

export const getDomainExpiryReport = async () => {
  const res = await axios.get(
    `${API_URL}/reports/domain-expiry`
  )

  return res.data
}

export const getSslExpiryReport = async () => {
  const res = await axios.get(
    `${API_URL}/reports/ssl-expiry`
  )

  return res.data
}

export const getDnsSyncReport = async () => {
  const res = await axios.get(
    `${API_URL}/reports/dns-sync`
  )

  return res.data
}

export const exportDomainExpiryReport = async () => {
  const res = await axios.get(
    `${API_URL}/reports/domain-expiry/export`,
    {
      responseType: 'blob',
    }
  )

  return res.data
}

export const exportSslExpiryReport = async () => {
  const res = await axios.get(
    `${API_URL}/reports/ssl-expiry/export`,
    {
      responseType: 'blob',
    }
  )

  return res.data
}