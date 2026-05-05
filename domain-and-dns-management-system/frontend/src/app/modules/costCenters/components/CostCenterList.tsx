import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCostCenters, deleteCostCenter } from "../api/costCenterApi"
import { showToast } from "../../../utils/toast"

const CostCenterList = ({ onView }: { onView: (id: number) => void }) => {
  const [costCenters, setCostCenters] = useState<any[]>([])
  const navigate = useNavigate()

  const fetchData = async () => {
    const data = await getCostCenters()
    setCostCenters(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    await deleteCostCenter(id)
    showToast("Cost Center deactivated", "success")
    fetchData()
  }

  return (
    <div className="card">

      {/* Header */}
      <div className="card-header border-0 pt-6 d-flex justify-content-between">
        <div>
          <h2 className="fw-bold mb-1">Cost Centers</h2>
          <div className="text-muted fs-7">
            Manage company cost centers
          </div>
        </div>

        <button
          className="btn btn-sm btn-primary"
          onClick={() => navigate("/cost-centers/create")}
        >
          + Add Cost Center
        </button>
      </div>

      {/* Table */}
      <div className="card-body">
        <table className="table align-middle table-row-dashed fs-6 gy-5">

          <thead>
            <tr className="text-muted fw-bold fs-7 text-uppercase">
              <th>Name</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {costCenters.map((c) => (
              <tr key={c.cost_center_id}>

                {/* Name + Company */}
                <td>
                  <div className="d-flex flex-column">
                    <span className="fw-bold text-gray-900 fs-6 cursor-pointer text-hover-primary"
                        onClick={() => onView(c.cost_center_id)}
                    >
                      {c.cost_center_name}
                    </span>
                    <span className="text-muted fs-7">
                      {c.Company?.company_name || "-"}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td>
                  <span className="badge badge-light-success">
                    {c.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="text-end">
                  <div className="dropdown">
                    <button
                      className="btn btn-icon btn-bg-light btn-sm"
                      data-bs-toggle="dropdown"
                    >
                      ⋮
                    </button>

                    <div className="dropdown-menu dropdown-menu-end">
                      <button
                        className="dropdown-item"
                        onClick={() => navigate(`/cost-centers/view/${c.cost_center_id}`)}
                      >
                        View
                      </button>

                      <button
                        className="dropdown-item"
                        onClick={() => navigate(`/cost-centers/edit/${c.cost_center_id}`)}
                      >
                        Edit
                      </button>

                      <button
                        className="dropdown-item text-danger"
                        onClick={() => handleDelete(c.cost_center_id)}
                      >
                        Delete
                      </button>
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

export default CostCenterList