import { useEffect, useState } from "react"
import { getVendorById } from "../api/vendorApi"
import { useNavigate, useParams } from "react-router-dom"

const ViewVendorPage = () => {
  const { id } = useParams()
  const [vendor, setVendor] = useState<any>(null)
  const navigate = useNavigate()
  useEffect(() => {
    getVendorById(id!).then(setVendor)
  }, [])



  return vendor && (
    <div className="card mb-5">

  <div className="card-body d-flex justify-content-between align-items-center">

    <div>
      <h2 className="fw-bold text-gray-900 mb-1">
        {vendor.vendor_name}
      </h2>

      <span className="badge badge-light-success">
        {vendor.status}
      </span>
    </div>

    <div>
      <button className="btn btn-sm btn-light" onClick={() => navigate("/vendors")}>
        Back
      </button>

      <button
        className="btn btn-sm btn-primary ms-2"
        onClick={() => navigate(`/vendors/edit/${vendor.vendor_id}`)}
      >
        Edit
      </button>
    </div>

  </div>

</div>
  )
}

export default ViewVendorPage