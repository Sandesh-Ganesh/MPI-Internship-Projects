import { useEffect, useState } from "react"
import { getCompanies } from "../../companies/api/companyApi"
import { showToast } from "../../../utils/toast"

const CostCenterForm = ({ mode, initialData, onSubmit }: any) => {
  const [companies, setCompanies] = useState([])

  const [formData, setFormData] = useState({
    company_id: "",
    cost_center_name: "",
  })

  useEffect(() => {
    getCompanies().then(setCompanies)
  }, [])

  useEffect(() => {
    if (initialData) {
      setFormData({
        company_id: String(initialData.company_id),
        cost_center_name: initialData.cost_center_name,
      })
    }
  }, [initialData])

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!formData.company_id) {
      showToast("Company is required", "error")
      return
    }
    if (!formData.cost_center_name) {
      showToast("Cost Center Name is required", "error")
      return
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="card w-50 mx-auto">

        <div className="card-body">

          {/* Company */}
          <div className="mb-5">
            <label className="form-label fw-semibold required">Company</label>
            <select
              name="company_id"
              className="form-select"
              value={formData.company_id}
              onChange={handleChange}
              disabled={mode === "view"}
            >
              <option value="">Select Company</option>
              {companies.map((c: any) => (
                <option key={c.company_id} value={c.company_id}>
                  {c.company_name}
                </option>
              ))}
            </select>
          </div>

          {/* Cost Center Name */}
          <div className="mb-5">
            <label className="form-label fw-semibold required">Cost Center Name</label>
            <input
              name="cost_center_name"
              className="form-control"
              value={formData.cost_center_name}
              onChange={handleChange}
              disabled={mode === "view"}
            />
          </div>

        </div>

        {mode !== "view" && (
          <div className="card-footer text-end">
            <button className="btn btn-primary">
              {mode === "edit" ? "Update" : "Create"}
            </button>
          </div>
        )}

      </div>
    </form>
  )
}

export default CostCenterForm