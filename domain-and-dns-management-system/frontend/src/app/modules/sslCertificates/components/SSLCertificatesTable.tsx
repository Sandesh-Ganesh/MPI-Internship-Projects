import {useNavigate} from "react-router-dom"

const getStatusClass = (status: string) => {
  if (status === "ACTIVE") return "badge-light-success"
  if (status === "EXPIRED") return "badge-light-danger"
  return "badge-light-warning"
}

const formatDate = (value?: string) => {
  if (!value) return "-"
  return new Date(value).toLocaleDateString("en-IN")
}

export const SSLCertificatesTable = ({certificates, onDeactivate}: any) => {
  const navigate = useNavigate()

  return (
    <div className="card">
      <div className="card-body pt-0">
        <div className="table-responsive">
          <table className="table align-middle table-row-dashed fs-6 gy-5">
            <thead>
              <tr className="text-start text-muted fw-bold fs-7 text-uppercase">
                <th>ID</th>
                <th>SSL Name</th>
                <th>Domain</th>
                <th>Type</th>
                <th>Validation</th>
                <th>Encryption</th>
                <th>Vendor</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 fw-semibold">
              {certificates.length > 0 ? (
                certificates.map((cert: any) => (
                  <tr key={cert.ssl_id}>
                    <td>{cert.ssl_id}</td>
                    <td className="fw-bold">{cert.ssl_name}</td>
                    <td>{cert.Domain?.domain_name || "-"}</td>
                    <td>{cert.cert_type}</td>
                    <td>{cert.validation_type}</td>
                    <td>{cert.encryption_type}</td>
                    <td>{cert.Vendor?.vendor_name || "-"}</td>
                    <td className="text-warning fw-bold">{formatDate(cert.expiry_date)}</td>
                    <td>
                      <span className={`badge ${getStatusClass(cert.status)}`}>
                        {cert.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-light-primary me-2"
                        onClick={() => navigate(`/ssl-certificates/edit/${cert.ssl_id}`)}
                      >
                        Edit
                      </button>
                      {cert.status !== "INACTIVE" && (
                        <button
                          className="btn btn-sm btn-light-danger"
                          onClick={() => onDeactivate(cert.ssl_id)}
                        >
                          Deactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center">
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
