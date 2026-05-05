import { useNavigate } from "react-router-dom"

export const DomainsList = ({ domains }: any) => {
  const navigate = useNavigate()

  const getExpiryStatus = (expiry_date: string) => {
    const today = new Date()
    const expiry = new Date(expiry_date)

    const diffDays =
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)

    if (diffDays < 0) return "EXPIRED"
    if (diffDays <= 30) return "EXPIRING"
    return "ACTIVE"
  }

  const getBadgeClass = (status: string) => {
    if (status === "EXPIRED") return "badge-light-danger"
    if (status === "EXPIRING") return "badge-light-warning"
    return "badge-light-success"
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Domains</h3>
      </div>

      <div className="card-body">
        <div className="d-flex flex-column gap-5">
          {domains.length === 0 ? (
            <div className="text-center text-muted py-10">
              No domains found for this company
            </div>
          ) : (
            domains.map((domain: any) => {
              const expiryStatus = getExpiryStatus(domain.expiry_date)

              return (
                <div
                  key={domain.domain_id}
                  className="d-flex align-items-center justify-content-between border-start border-3 border-success ps-4 py-3"
                >
                  {/* LEFT */}
                  <div className="d-flex flex-column">
                    <span
                      className="fw-bold cursor-pointer text-primary"
                      onClick={() =>
                        navigate(`/domains/view/${domain.domain_id}`)
                      }
                    >
                      {domain.domain_name}
                    </span>

                    <span className="text-muted fs-7">
                      {domain.Company?.company_name || "-"}
                    </span>
                  </div>

                  {/* RIGHT */}
                  <div className="d-flex align-items-center gap-10">
                    {/* Vendor */}
                    <div className="text-end">
                      <div className="fw-semibold">
                        {domain.Vendor?.vendor_name || "-"}
                      </div>
                      <div className="text-muted fs-7">Vendor</div>
                    </div>

                    {/* Expiry */}
                    <div className="text-end">
                      <div className="fw-bold text-warning">
                        {new Date(domain.expiry_date).toLocaleDateString("en-IN")}
                      </div>
                      <div className="text-muted fs-7">Expiry</div>
                    </div>

                    {/* Status */}
                    <span className={`badge ${getBadgeClass(expiryStatus)}`}>
                      {expiryStatus}
                    </span>

                    {/* Actions */}
                    <div className="dropdown">
                      <button
                        className="btn btn-light btn-sm"
                        data-bs-toggle="dropdown"
                      >
                        ⋮
                      </button>

                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() =>
                              navigate(`/domains/view/${domain.domain_id}`)
                            }
                          >
                            View
                          </button>
                        </li>

                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() =>
                              navigate(`/domains/edit/${domain.domain_id}`)
                            }
                          >
                            Edit
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}