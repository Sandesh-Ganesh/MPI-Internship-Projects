import React from "react"
import { useNavigate } from "react-router-dom"

type SSLCertificate = {
  ssl_id: number
  status: string
  Domain?: { domain_name: string }
  Vendor?: { vendor_name: string }
  ControlPanel?: { panel_name: string }
  requester?: { username: string }
  approver?: { username: string }
}

type Props = {
  data: SSLCertificate[]
}

const SSLCertificateTimeline: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate()
  return (
    <div className="timeline-label">
      {data.map((ssl, index) => (
        <div key={ssl.ssl_id} className="timeline-item">
          
          {/* Timeline Badge */}
          <div className="timeline-label fw-bold text-gray-800 fs-6">
            SSL #{ssl.ssl_id}
          </div>

          {/* Timeline Icon */}
          <div className="timeline-badge">
            <i
              className={`fa fa-genderless ${
                ssl.status === "ACTIVE"
                  ? "text-success"
                  : "text-muted"
              } fs-1`}
            ></i>
          </div>

          {/* Timeline Content */}
          <div className="fw-mormal timeline-content text-muted ps-3">
            
            <div className="card card-bordered w-100">
              <div className="card-body">

                <div className="d-flex justify-content-between">
                  <span className="fw-bold">
                    {ssl.Domain?.domain_name}
                  </span>

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

                <div className="mt-2">
                  <small>Vendor: {ssl.Vendor?.vendor_name}</small><br />
                  <small>Panel: {ssl.ControlPanel?.panel_name}</small>
                </div>

                <div className="mt-2">
                  <small>
                    Requested By: {ssl.requester?.username}
                  </small><br />
                  <small>
                    Approved By: {ssl.approver?.username || "-"}
                  </small>
                </div>

                <div className="mt-3">
                  <button className="btn btn-sm btn-light-primary" onClick={() => alert("hello")}>
                    View
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}

export default SSLCertificateTimeline