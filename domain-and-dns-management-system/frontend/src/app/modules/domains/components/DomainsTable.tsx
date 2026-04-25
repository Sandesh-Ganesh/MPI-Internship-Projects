export const DomainsTable = ({domains}: any) => {
  const getStatusClass = (status: string) => {
    if (status === "ACTIVE") return "badge-light-success"
    if (status === "EXPIRED") return "badge-light-danger"
    return "badge-light-warning"
  }
  return (
     <div className="card">
      <div className="card-header border-0 pt-6">
        <div className="card-title">
          {/* Search */}
          <div className="d-flex align-items-center position-relative my-1">
            <input
              type="text"
              className="form-control form-control-solid w-250px ps-4"
              placeholder="Search domains"
            />
          </div>
        </div>

        <div className="card-toolbar">
          <button className="btn btn-primary">
            + Add Domain
          </button>
        </div>
      </div>
       <div className="card-body pt-0">
        <div className="table-responsive">
          <table className="table align-middle table-row-dashed fs-6 gy-5">
            <thead>
              <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                <th>Domain</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Company</th>
                <th>Vendor</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 fw-semibold">
              {domains.map((domain: any, index: number) => (
                <tr key={index}>
                  <td className="fw-bold">{domain.domain_name}</td>

                  <td>{domain.expiry_date}</td>

                  <td>
                    <span className={`badge ${getStatusClass(domain.status)}`}>
                      {domain.status}
                    </span>
                  </td>

                  <td>{domain.company?.name || "-"}</td>
                  <td>{domain.vendor?.name || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}