import {useNavigate} from "react-router-dom"

export const DomainsTable = ({domains}: any) => {

  const getStatusClass = (status: string) => {
    if (status === "ACTIVE") return "badge-light-success"
    if (status === "EXPIRED") return "badge-light-danger"
    return "badge-light-warning"
  }

  const navigate = useNavigate()

  return (
    <div className="card">
      <div className="card-body pt-0">
        <div className="table-responsive">
          <table className="table align-middle table-row-dashed fs-6 gy-5">
            
            <thead>
              <tr className="text-start text-muted fw-bold fs-7 text-uppercase">
                <th>Domain ID</th>
                <th>Domain Name</th>
                <th>Company</th>
                <th>Cost Centre</th>
                <th>Vendor</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {domains.map((domain: any) => (
                <tr key={domain.domain_id}>

                  <td>{domain.domain_id}</td>

                  <td className="fw-bold">{domain.domain_name}</td>

                  <td>{domain.company?.name || "-"}</td>

                  <td>{domain.cost_center?.name || "-"}</td>

                  <td>{domain.vendor?.name || "-"}</td>

                  <td className="text-warning fw-bold">
                    {new Date(domain.expiry_date).toLocaleDateString("en-IN")}
                  </td>

                  <td>
                    <span className={`badge ${getStatusClass(domain.status)}`}>
                      {domain.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-light-primary me-2"
                      onClick={() => navigate(`/domains/edit/${domain.domain_id}`)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-sm btn-light-primary me-2">
                      Renew
                    </button>

                    <button className="btn btn-sm btn-light-info me-2">
                      DNS
                    </button>

                    <button className="btn btn-sm btn-light-dark">
                      History
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}