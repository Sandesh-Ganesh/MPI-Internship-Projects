import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"
import {Content} from "../../../../_metronic/layout/components/content"
import {ToolbarWrapper} from "../../../../_metronic/layout/components/toolbar"
import {PageTitle} from "../../../../_metronic/layout/core"
import {getSSLCertificateTimeline} from "../api/sslCertificatesApi"

export const SSLCertificateTimelinePage = () => {
  const {id} = useParams()
  const [timeline, setTimeline] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSSL, setSelectedSSL] = useState<any>(null)
  const navigate = useNavigate()
  const fetchTimeline = async () => {
    try {
      setLoading(true)
      const data = await getSSLCertificateTimeline(id!)
      setTimeline(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTimeline()
  }, [id])

  return (
    <>
      <PageTitle breadcrumbs={[]}>SSL Timeline</PageTitle>
      <ToolbarWrapper />

      <Content>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="timeline-label">

            {timeline.map((ssl) => (
              <div key={ssl.ssl_id} className="timeline-item">

                {/* Label */}
                <div className="timeline-label fw-bold text-gray-800 fs-6">
                  SSL #{ssl.ssl_id}
                </div>

                {/* Icon */}
                <div className="timeline-badge">
                  <i
                    className={`fa fa-genderless fs-1 ${
                      ssl.status === "ACTIVE"
                        ? "text-success"
                        : "text-muted"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="timeline-content text-muted ps-3">
                  <div
                    className={`card w-100 ${
                      ssl.status === "ACTIVE"
                        ? "border border-success"
                        : ""
                    }`}
                  >
                    <div className="card-body">

                      {/* Header */}
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

                      {/* Details */}
                      <div className="mt-2">
                        <small>Vendor: {ssl.Vendor?.vendor_name}</small><br />
                        <small>Panel: {ssl.ControlPanel?.panel_name}</small>
                      </div>

                      <div className="mt-2">
                        <small>
                          Requested: {ssl.requester?.username}
                        </small><br />
                        <small>
                          Approved: {ssl.approver?.username || "-"}
                        </small>
                      </div>

                      {/* Action */}
                      <div className="card cursor-pointer hover-elevate-up">
                        <button
                          className="btn btn-sm btn-light-primary"
                          onClick={() => navigate(`/ssl-certificates/${ssl.ssl_id}`)}
                        >
                          View Details
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}

        {/* 🔥 Drawer */}
        {selectedSSL && (
          <div className="drawer drawer-end show" style={{width: "400px"}}>
            <div className="card h-100 shadow">
              <div className="card-header">
                <h3>SSL Details</h3>
                <button
                  className="btn btn-sm btn-light"
                  onClick={() => setSelectedSSL(null)}
                >
                  Close
                </button>
              </div>

              <div className="card-body">

                <p><strong>SSL ID:</strong> {selectedSSL.ssl_id}</p>
                <p><strong>Status:</strong> {selectedSSL.status}</p>
                <p><strong>Domain:</strong> {selectedSSL.Domain?.domain_name}</p>
                <p><strong>Vendor:</strong> {selectedSSL.Vendor?.vendor_name}</p>
                <p><strong>Panel:</strong> {selectedSSL.ControlPanel?.panel_name}</p>

                <p>
                  <strong>Requested By:</strong> {selectedSSL.requester?.username}
                </p>

                <p>
                  <strong>Approved By:</strong> {selectedSSL.approver?.username || "-"}
                </p>

              </div>
            </div>
          </div>
        )}

      </Content>
    </>
  )
}