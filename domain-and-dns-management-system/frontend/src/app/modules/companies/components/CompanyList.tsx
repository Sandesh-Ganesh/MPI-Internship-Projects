import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCompanies, deleteCompany } from "../api/companyApi"
import { showToast } from "../../../utils/toast"

const CompanyList = () => {
  const [companies, setCompanies] = useState<any[]>([])
  const navigate = useNavigate()

  const fetchData = async () => {
    const data = await getCompanies()
    setCompanies(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    await deleteCompany(id)
    showToast("Company deactivated", "success")
    fetchData()
  }

  return (
    <div className="card">

      <div className="card-header border-0 pt-6 d-flex justify-content-between">
        <div>
          <h2 className="fw-bold mb-1">Companies</h2>
          <div className="text-muted fs-7">
            Manage company records
          </div>
        </div>

        <button
          className="btn btn-sm btn-primary"
          onClick={() => navigate("/companies/create")}
        >
          + Add Company
        </button>
      </div>

      <div className="card-body">
        <table className="table align-middle table-row-dashed fs-6 gy-5">

          <thead>
            <tr className="text-muted fw-bold fs-7 text-uppercase">
              <th>Name</th>
              <th>Code</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((c) => (
              <tr key={c.company_id}>
                
                <td className="fw-bold text-gray-900 text-hover-primary fs-6 cursor-pointer" onClick={() => navigate(`/companies/view/${c.company_id}`)}>
                  {c.company_name}
                </td>

                <td>{c.company_code}</td>

                <td>
                  <span className="badge badge-light-success">
                    {c.status}
                  </span>
                </td>

                <td className="text-end">
                  <div className="dropdown">
                    <button className="btn btn-icon btn-bg-light btn-sm" data-bs-toggle="dropdown">
                      ⋮
                    </button>

                    <div className="dropdown-menu dropdown-menu-end">
                      <button onClick={() => navigate(`/companies/view/${c.company_id}`)} className="dropdown-item">View</button>
                      <button onClick={() => navigate(`/companies/edit/${c.company_id}`)} className="dropdown-item">Edit</button>
                      <button onClick={() => handleDelete(c.company_id)} className="dropdown-item text-danger">Delete</button>
                    </div>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default CompanyList