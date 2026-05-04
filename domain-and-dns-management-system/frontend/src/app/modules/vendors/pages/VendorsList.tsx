import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getVendors, deleteVendor } from "../api/vendorApi"
import { showToast } from "../../../utils/toast"

export const VendorsList = () => {
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
    showToast("Vendor deleted","success")
    fetchData()
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h3>Vendors</h3>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/vendors/create")}
        >
          Add Vendor
        </button>
      </div>

      <div className="card-body">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((v) => (
              <tr key={v.vendor_id}>
                <td>{v.vendor_name}</td>
                <td>{v.status}</td>

                <td>
                  <button onClick={() => navigate(`/vendors/view/${v.vendor_id}`)}>View</button>
                  <button onClick={() => navigate(`/vendors/edit/${v.vendor_id}`)}>Edit</button>
                  <button onClick={() => handleDelete(v.vendor_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
