import { useEffect, useState } from "react"
import { getVendorById, updateVendor } from "../api/vendorApi"
import { useParams, useNavigate } from "react-router-dom"
import VendorForm from "../components/VendorForm"
import { showToast } from "../../../utils/toast"

const EditVendorPage = () => {
  const { id } = useParams()
  const [vendor, setVendor] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getVendorById(id!).then(setVendor)
  }, [])

  const handleSubmit = async (data: any) => {
    await updateVendor(id!, data)
    showToast("Vendor updated","success")
    navigate("/vendors", { replace:true })
  }

  return vendor && (
    <VendorForm initialData={vendor} onSubmit={handleSubmit} mode="edit" />
  )
}

export default EditVendorPage