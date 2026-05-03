import React from "react"

type SSLCertificate = {
  ssl_id: number
  ssl_name: string
  status: string
  expiry_date?: string
  cert_type?: string
  validation?: string
  encryption?: string

  Domain?: { domain_name: string }
  Vendor?: { vendor_name: string }
}

type Props = {
  certificates: SSLCertificate[]
  onDeactivate: (id: number) => void
  onViewTimeline: (id: number) => void
  onEdit?: (id: number) => void
}

export const SSLCertificatesTable: React.FC<Props> = ({
  certificates,
  onDeactivate,
  onViewTimeline,
  onEdit,
}) => {
  return (
    <div className="card">
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">

            <thead>
              <tr className="fw-bold text-muted">
                <th>SSL</th>
                <th>Vendor</th>
                <th>Expiry</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {certificates.map((cert) => (
                <tr
                  key={cert.ssl_id}
                  className={
                    cert.status === "ACTIVE"
                      ? "border-start border-3 border-success"
                      : ""
                  }
                >
                  {/* SSL Info */}
                  <td>
                    <div className="d-flex flex-column">
                      <span className="fw-bold text-gray-800">
                        {cert.ssl_name}
                      </span>

                      <span className="text-muted fs-7">
                        {cert.Domain?.domain_name}
                      </span>

                      <span className="text-muted fs-7">
                        {cert.cert_type} • {cert.validation} • {cert.encryption}
                      </span>
                    </div>
                  </td>

                  {/* Vendor */}
                  <td>
                    <span className="text-gray-800 fw-semibold">
                      {cert.Vendor?.vendor_name || "-"}
                    </span>
                  </td>

                  {/* Expiry */}
                  <td>
                    <span className="fw-semibold text-warning">
                      {cert.expiry_date || "-"}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`badge fw-bold ${
                        cert.status === "ACTIVE"
                          ? "badge-light-success"
                          : cert.status === "INACTIVE"
                          ? "badge-light-secondary"
                          : "badge-light-warning"
                      }`}
                    >
                      {cert.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-light btn-active-light-primary"
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-end"
                    >
                      Actions
                    </button>

                    <div
                      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4"
                      data-kt-menu="true"
                    >
                      {/* Edit */}
                      {onEdit && (
                        <div className="menu-item px-3">
                          <button
                            className="menu-link px-3"
                            onClick={() => onEdit(cert.ssl_id)}
                          >
                            Edit
                          </button>
                        </div>
                      )}

                      {/* Deactivate only if ACTIVE */}
                      {cert.status === "ACTIVE" && (
                        <div className="menu-item px-3">
                          <button
                            className="menu-link px-3 text-danger"
                            onClick={() => onDeactivate(cert.ssl_id)}
                          >
                            Deactivate
                          </button>
                        </div>
                      )}

                      {/* Timeline */}
                      <div className="menu-item px-3">
                        <button
                          className="menu-link px-3"
                          onClick={() => onViewTimeline(cert.ssl_id)}
                        >
                          View History
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {certificates.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-10">
                    No SSL certificates found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}