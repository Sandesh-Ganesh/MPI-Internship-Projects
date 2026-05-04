import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios"
import {Content} from "../../../../_metronic/layout/components/content"
import {PageTitle} from "../../../../_metronic/layout/core"
import DNSRecordsTable from "../../dnsRecords/components/DNSRecordsTable"
import ActivityLogsTable from "../../logs/components/ActivityLogsTable"
import { getActivityLogs } from "../../logs/api/activityLogsApi"
import SyncLogsTable from "../../logs/components/SyncLogsTable"
import DNSChangeLogsTable from "../../logs/components/DNSChangeLogsTable"
import { getSyncLogs } from "../../logs/api/syncLogsApi"
import { getDNSChangeLogs } from "../../logs/api/dnsChangeLogsApi"

const API_URL = import.meta.env.VITE_APP_API_URL

export const DomainViewPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [domain, setDomain] = useState<any>(null)
  const [ssl, setSSL] = useState<any>(null)
  const [dnsRecords, setDnsRecords] = useState<any[]>([])
  const [logs, setLogs] = useState<any[]>([])
  const [syncLogs, setSyncLogs] = useState<any[]>([])
  const [dnsChangeLogs, setDNSChangeLogs] = useState<any[]>([])

  const fetchDomain = async () => {
    try {
      const res = await axios.get(`${API_URL}/domains/domains/${id}`)
      setDomain(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchSSL = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/ssl-certificates/domain/${id}/active`
      )
      setSSL(res.data)
    } catch (err) {
      console.error("No SSL found")
    }
  }

  const fetchDNSRecords = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/records/dns-records/domain/${id}`
    )
    setDnsRecords(res.data)
  } catch (err) {
    console.error("No DNS records found")
  }
}
  const fetchLogs = async () => {
    try {
      const data = await getActivityLogs({
        log_type: "DOMAIN",
        entity_id: id,
      })

      setLogs(data.logs || [])
    } catch (error) {
      console.error("Error fetching domain logs", error)
    }
  }

  const fetchSyncLogs = async () => {
  try {
    const data = await getSyncLogs({
      domain_id: id,
      limit: 20,
    })
    setSyncLogs(data.logs || data)
  } catch (error) {
    console.error("Error fetching sync logs", error)
  }
}

const fetchDNSChangeLogs = async () => {
  try {
    const data = await getDNSChangeLogs({
      domain_id: id,
      limit: 20,
    })
    setDNSChangeLogs(data.logs || [])
  } catch (error) {
    console.error("Error fetching DNS change logs", error)
  }
}

  useEffect(() => {
    fetchDomain()
    fetchSSL()
    fetchDNSRecords()
    fetchLogs()
    fetchSyncLogs()
    fetchDNSChangeLogs()
  }, [])

  if (!domain) return <p>Loading...</p>

  const getExpiryStatus = () => {
    const today = new Date()
    const expiry = new Date(domain.expiry_date)

    const diffDays =
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)

    if (diffDays < 0) return "EXPIRED"
    if (diffDays <= 30) return "EXPIRING"
    return "ACTIVE"
  }

  return (
    <>
      <PageTitle>Domain Details</PageTitle>

      <Content>

        {/* 🔙 BACK */}
        <div className="card p-5 mb-5">
          <div className="d-flex justify-content-between align-items-center">

            {/* LEFT */}
            <div>
              <h2 className="fw-bold mb-2">{domain.domain_name}</h2>

              <span className={`badge ${
                getExpiryStatus() === "EXPIRED"
                  ? "badge-light-danger"
                  : getExpiryStatus() === "EXPIRING"
                  ? "badge-light-warning"
                  : "badge-light-success"
              }`}>
                {getExpiryStatus()}
              </span>
            </div>

            {/* RIGHT */}
            <div className="d-flex gap-3">
              <button
                className="btn btn-light-primary"
                onClick={() => navigate(`/domains/edit/${domain.domain_id}`)}
              >
                Edit
              </button>

              <button
                className="btn btn-light"
                onClick={() => navigate("/domains")}
              >
                Back
              </button>
            </div>

          </div>
        </div>

        {/* 🔹 OVERVIEW */}
        <div className="card p-5 mb-5">
          <h4 className="mb-4">Overview</h4>

          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Company:</strong> {domain.Company?.company_name}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Vendor:</strong> {domain.Vendor?.vendor_name}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Control Panel:</strong> {domain.control_panel_id}
            </div>

            <div className="col-md-6 mb-3">
              <strong>DNS Panel:</strong> {domain.dns_control_panel_id}
            </div>
          </div>
        </div>

        {/* 🔹 LIFECYCLE */}
        <div className="card p-5 mb-5">
          <h4 className="mb-4">Lifecycle</h4>

          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Registered Date:</strong>{" "}
              {new Date(domain.registered_date).toLocaleDateString("en-IN")}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Expiry Date:</strong>{" "}
              {new Date(domain.expiry_date).toLocaleDateString("en-IN")}
            </div>
          </div>
        </div>

        <div className="card p-5 mb-5">
          <h4 className="mb-4">Active SSL Certificate</h4>

          {!ssl ? (
            <div className="text-muted">No active SSL found</div>
          ) : (
            <div className="d-flex justify-content-between align-items-center">

              {/* LEFT */}
              <div>
                <div className="fw-bold fs-5">{ssl.ssl_name}</div>
                <div className="text-muted fs-7">
                  {ssl.cert_type} • {ssl.validation_type}
                </div>
              </div>

              {/* MIDDLE */}
              <div>
                <div className="fw-bold text-warning">
                  {new Date(ssl.expiry_date).toLocaleDateString("en-IN")}
                </div>
                <div className="text-muted fs-7">Expiry</div>
              </div>

              {/* RIGHT */}
              <div className="d-flex gap-3">

                <button
                  className="btn btn-light-primary btn-sm"
                  onClick={() =>
                    navigate(`/ssl-certificates/${ssl.ssl_id}`)
                  }
                >
                  View
                </button>

                <button
                  className="btn btn-light btn-sm"
                  onClick={() =>
                    navigate(`/ssl-certificates/${ssl.ssl_id}/edit`)
                  }
                >
                  Edit
                </button>

              </div>

            </div>
          )}
          
        </div>

        <div className="card p-5 mb-5">
            <h4 className="mb-4">DNS Records</h4>

            {dnsRecords.length === 0 ? (
              <div className="text-muted">No DNS records found</div>
            ) : (
              <DNSRecordsTable records={dnsRecords} hideDomain />
            )}
        </div>

        <div className="mt-10">
          <ActivityLogsTable logs={logs}  title="Domain Activity Logs" showDropDown={false} />
        </div>

        <div className="mt-10">
          <SyncLogsTable logs={syncLogs} />
        </div>

        <div className="mt-10">
          <DNSChangeLogsTable logs={dnsChangeLogs} />
        </div>

      </Content>
    </>
  )
}