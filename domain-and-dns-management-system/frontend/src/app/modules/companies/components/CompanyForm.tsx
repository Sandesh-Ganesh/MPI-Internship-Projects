import { useEffect, useState } from "react"

const CompanyForm = ({ mode, initialData, onSubmit }: any) => {
  const [formData, setFormData] = useState({
    company_name: "",
    company_code: "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        company_name: initialData.company_name || "",
        company_code: initialData.company_code || "",
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
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="card w-50 mx-auto">

        <div className="card-body">

          {/* Name */}
          <div className="mb-5">
            <label className="form-label fw-semibold">Company Name</label>
            <input
              name="company_name"
              className="form-control"
              value={formData.company_name}
              onChange={handleChange}
              disabled={mode === "view"}
            />
          </div>

          {/* Code */}
          <div className="mb-5">
            <label className="form-label fw-semibold">Company Code</label>
            <input
              name="company_code"
              className="form-control"
              value={formData.company_code}
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

export default CompanyForm