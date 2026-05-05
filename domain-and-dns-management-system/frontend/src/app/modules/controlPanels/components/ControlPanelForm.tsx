import { useEffect, useState } from "react"
import { getVendors } from "../../vendors/api/vendorApi"

const ControlPanelForm = ({ mode, initialData, onSubmit }: any) => {
  const [vendors, setVendors] = useState<any[]>([])

  const [formData, setFormData] = useState({
    panel_name: "",
    vendor_id: "",
    hosting_flag: false,
    dns_flag: false,
    ssl_flag: false,
  })

  useEffect(() => {
    getVendors().then(setVendors)
  }, [])

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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

          {/* Panel Name */}
          <div className="mb-5">
            <label className="form-label fw-semibold">Panel Name</label>
            <input
              name="panel_name"
              className="form-control"
              value={formData.panel_name}
              onChange={handleChange}
              disabled={mode === "view"}
            />
          </div>

          {/* Vendor */}
          <div className="mb-5">
            <label className="form-label fw-semibold">Vendor</label>
            <select
              name="vendor_id"
              className="form-select"
              value={formData.vendor_id}
              onChange={handleChange}
              disabled={mode === "view"}
            >
              <option value="">Select Vendor</option>
              {vendors.map((v) => (
                <option key={v.vendor_id} value={v.vendor_id}>
                  {v.vendor_name}
                </option>
              ))}
            </select>
          </div>

          {/* Capabilities */}
          <div className="mb-5">
            <label className="form-label fw-semibold">Capabilities</label>

            <div className="d-flex gap-10 mt-2">

              <div className="form-check form-check-custom form-check-solid">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="dns_flag"
                  checked={formData.dns_flag}
                  onChange={handleChange}
                  disabled={mode === "view"}
                />
                <label className="form-check-label">DNS</label>
              </div>

              <div className="form-check form-check-custom form-check-solid">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="hosting_flag"
                  checked={formData.hosting_flag}
                  onChange={handleChange}
                  disabled={mode === "view"}
                />
                <label className="form-check-label">Hosting</label>
              </div>

              <div className="form-check form-check-custom form-check-solid">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="ssl_flag"
                  checked={formData.ssl_flag}
                  onChange={handleChange}
                  disabled={mode === "view"}
                />
                <label className="form-check-label">SSL</label>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        {mode !== "view" && (
          <div className="card-footer d-flex justify-content-end">
            <button className="btn btn-primary">
              {mode === "edit" ? "Update" : "Create"}
            </button>
          </div>
        )}
      </div>
    </form>
  )
}

export default ControlPanelForm