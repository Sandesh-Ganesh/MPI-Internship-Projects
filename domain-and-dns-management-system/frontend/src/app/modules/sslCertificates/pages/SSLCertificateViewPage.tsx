import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {Content} from "../../../../_metronic/layout/components/content"
import {PageTitle} from "../../../../_metronic/layout/core"
import {getSSLCertificateById} from "../api/sslCertificatesApi"
import { getActivityLogs } from "../../logs/api/activityLogsApi"
import ActivityLogsTable from "../../logs/components/ActivityLogsTable"
import {useAuth} from "../../auth"
const Detail = ({label, value}: any) => (
  <div className="col-md-4 mb-4">
    <div className="text-muted fs-7">{label}</div>
    <div className="fw-bold text-gray-800">{value || "-"}</div>
  </div>
)

const formatDate = (date?: string) => {
  if (!date) return "-"
  return new Date(date).toLocaleDateString()
}

export const SSLCertificateViewPage = () => {
  const {currentUser} = useAuth()
  const {id} = useParams()
  const navigate = useNavigate()
  const [ssl, setSSL] = useState<any>(null)
  const [logs, setLogs] = useState<any[]>([])

  const fetchLogs = async () => {
  try {
    const data = await getActivityLogs({
      log_type: "SSL",
      entity_id: id,
    })

    setLogs(data.logs || [])
  } catch (error) {
    console.error("Error fetching SSL logs", error)
  }
}

  useEffect(() => {
    const fetch = async () => {
      const data = await getSSLCertificateById(id!)
      setSSL(data)
    }
    fetch()
    fetchLogs()
  }, [id])

  if (!ssl) return <div>Loading...</div>

  return (
    <>
      <PageTitle breadcrumbs={[]}>SSL Details</PageTitle>

      <Content>

        {/* 🔥 Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="fw-bold">{ssl.ssl_name}</h2>
            <span
              className={`badge ${
                ssl.status === "ACTIVE"
                  ? "badge-light-success"
                  : "badge-light-secondary"
              }`}
            >
              {ssl.status}
            </span>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-light"
              onClick={() => navigate(-1)}
            >
              Back
            </button>

            <button
              className="btn btn-light-primary"
              onClick={() => navigate(`/ssl-certificates/${ssl.ssl_id}/timeline`)}
            >
              View History
            </button>
              {currentUser?.role === "ADMIN" && (
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/ssl-certificates/${ssl.ssl_id}/edit`)}
            >
              Edit
            </button>
              )}
          </div>
        </div>

        {/* 🔥 Overview Card */}
        <div className="card mb-5">
          <div className="card-header">
            <h3 className="card-title">Overview</h3>
          </div>
          <div className="card-body row">

            <Detail label="Domain" value={ssl.Domain?.domain_name} />
            <Detail label="Vendor" value={ssl.Vendor?.vendor_name} />
            <Detail label="Control Panel" value={ssl.ControlPanel?.panel_name} />
            <Detail label="Expiry Date" value={formatDate(ssl.expiry_date)} />

          </div>
        </div>

        {/* 🔥 Configuration Card */}
        <div className="card mb-5">
          <div className="card-header">
            <h3 className="card-title">Configuration</h3>
          </div>
          <div className="card-body row">

            <Detail label="Certificate Type" value={ssl.cert_type} />
            <Detail label="Validation" value={ssl.validation_type} />
            <Detail label="Encryption" value={ssl.encryption_type} />

          </div>
        </div>

        {/* 🔥 Metadata Card */}
        <div className="card mb-5">
          <div className="card-header">
            <h3 className="card-title">Metadata</h3>
          </div>
          <div className="card-body row">

            <Detail label="Requested By" value={ssl.requester?.username} />
            <Detail label="Approved By" value={ssl.approver?.username || "-"} />
            <Detail label="Remarks" value={ssl.remarks || "-"} />

          </div>
        </div>

        <div className="mt-10">
          <ActivityLogsTable logs={logs} title="SSL Activity Logs" showDropDown={false} />
        </div>

      </Content>
    </>
  )
}