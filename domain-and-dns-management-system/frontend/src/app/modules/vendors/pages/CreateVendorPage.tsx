import VendorForm from "../components/VendorForm"
import { createVendor } from "../api/vendorApi"
import { useNavigate } from "react-router-dom"
import { showToast } from "../../../utils/toast"

const CreateVendorPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (data: any) => {
    await createVendor(data)
    showToast("Vendor created","success")
    navigate("/vendors")
  }

  return <VendorForm onSubmit={handleSubmit} mode="create" />
}

export default CreateVendorPage