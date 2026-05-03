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
  onView: (id: number) => void
}

export const SSLCertificatesList: React.FC<Props> = ({
  certificates,
  onDeactivate,
  onViewTimeline,
  onEdit,
  onView,
}) => {
  return (
    <div className="card card-xxl-stretch mb-5 mb-xl-8">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title fw-bold text-gray-900">
          SSL Certificates
        </h3>
      </div>

      {/* Body */}
      <div className="card-body pt-2">

        {certificates.length === 0 && (
          <div className="text-center text-muted py-10">
            No SSL certificates found
          </div>
        )}

        {certificates.map((cert) => (
          <div
            key={cert.ssl_id}
            className={`d-flex align-items-center justify-content-between py-5 ${
              cert.status === "ACTIVE"
                ? "border-start border-3 border-success ps-3"
                : ""
            }`}
          >
            {/* LEFT SECTION */}
            <div className="d-flex align-items-center flex-grow-1">

              {/* ICON */}
              <div className="symbol symbol-45px me-5">
                <span className="symbol-label bg-light-primary">
                  🔒
                </span>
              </div>

              {/* SSL INFO */}
              <div className="d-flex flex-column">
                <span className="fw-bold text-gray-900 fs-6 cursor-pointer text-hover-primary"
                  onClick={() => onView(cert.ssl_id)}
                >
                  {cert.ssl_name}
                </span>

                <span className="text-muted fw-semibold">
                  {cert.Domain?.domain_name}
                </span>

                <span className="text-muted fs-7">
                  {cert.cert_type} • {cert.validation} • {cert.encryption}
                </span>
              </div>
            </div>

            {/* VENDOR */}
            <div className="text-end me-10">
              <div className="fw-bold text-gray-800">
                {cert.Vendor?.vendor_name || "-"}
              </div>
              <div className="text-muted fs-7">Vendor</div>
            </div>

            {/* EXPIRY */}
            <div className="text-end me-10">
              <div className="fw-bold text-warning">
                {formatDate(cert.expiry_date)}
              </div>
              <div className="text-muted fs-7">Expiry</div>
            </div>

            {/* STATUS */}
            <div className="me-10">
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
            </div>

            {/* ACTIONS */}
            <div>
              <button
                className="btn btn-sm btn-light btn-active-light-primary"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
              >
                ⋮
              </button>

              <div
                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold fs-7 w-175px py-4"
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

                {/* Deactivate */}
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

                {/* History */}
                <div className="menu-item px-3">
                  <button
                    className="menu-link px-3"
                    onClick={() => onViewTimeline(cert.ssl_id)}
                  >
                    View History
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 🔥 helper
const formatDate = (date?: string) => {
  if (!date) return "-"
  return new Date(date).toLocaleDateString()
}