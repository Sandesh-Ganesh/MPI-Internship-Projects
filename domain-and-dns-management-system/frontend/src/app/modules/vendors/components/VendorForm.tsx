import { useEffect, useState } from "react"

const VendorForm = ({ mode, initialData, onSubmit }: any) => {
  const [formData, setFormData] = useState({
    vendor_name: "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        vendor_name: initialData.vendor_name || "",
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
      <div className="card">
        <div className="card-body">

          <div className="mb-3">
            <label className="form-label">Vendor Name</label>
            <input
              type="text"
              name="vendor_name"
              className="form-control"
              value={formData.vendor_name}
              onChange={handleChange}
              disabled={mode === "view"}
            />
          </div>

        </div>

        {mode !== "view" && (
          <div className="card-footer">
            <button className="btn btn-primary">
              {mode === "edit" ? "Update" : "Create"}
            </button>
          </div>
        )}
      </div>
    </form>
  )
}

export default VendorForm