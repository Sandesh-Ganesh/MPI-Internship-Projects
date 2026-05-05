import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getVendors, deleteVendor } from "../api/vendorApi"
import { showToast } from "../../../utils/toast"

const VendorList = () => {
  const [vendors, setVendors] = useState<any[]>([])
  const navigate = useNavigate()

  const fetchData = async () => {
    const data = await getVendors()
    setVendors(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    await deleteVendor(id)
    showToast("Vendor deactivated","success")
    fetchData()
  }

  return (
    <div className="card">

      {/* Header */}
      <div className="card-header border-0 pt-6 d-flex justify-content-between">

        <div>
          <h2 className="fw-bold mb-1">Vendors</h2>
          <div className="text-muted fs-7">
            Manage service providers
          </div>
        </div>

        <button
          className="btn btn-sm btn-primary"
          onClick={() => navigate("/vendors/create")}
        >
          + Add Vendor
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
            {vendors.map((v) => (
              <tr key={v.vendor_id}>

                <td className="fw-bold text-gray-900">
                  {v.vendor_name}
                </td>

                <td>
                  <span className="badge badge-light-success">
                    {v.status}
                  </span>
                </td>

                <td className="text-end">
                  <div className="dropdown">
                    <button
                      className="btn btn-icon btn-bg-light btn-sm"
                      data-bs-toggle="dropdown"
                    >
                      ⋮
                    </button>

                    <div className="dropdown-menu dropdown-menu-end">
                      <button onClick={() => navigate(`/vendors/view/${v.vendor_id}`)} className="dropdown-item">View</button>
                      <button onClick={() => navigate(`/vendors/edit/${v.vendor_id}`)} className="dropdown-item">Edit</button>
                      <button onClick={() => handleDelete(v.vendor_id)} className="dropdown-item text-danger">Delete</button>
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

export default VendorList