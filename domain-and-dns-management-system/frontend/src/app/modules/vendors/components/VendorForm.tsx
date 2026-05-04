import { useEffect, useState } from "react"

const VendorForm = ({ mode, initialData, onSubmit }: any) => {
  const [vendorName, setVendorName] = useState("")

  useEffect(() => {
    if (initialData) {
      setVendorName(initialData.vendor_name)
    }
  }, [initialData])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit({ vendor_name: vendorName })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="card w-50 mx-auto">

        <div className="card-body">

          <div className="mb-5">
            <label className="form-label fw-semibold">Vendor Name</label>
            <input
              className="form-control"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
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

export default VendorForm