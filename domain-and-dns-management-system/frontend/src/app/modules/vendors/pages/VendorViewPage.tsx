import { useEffect, useState } from "react"
import { getVendorById } from "../api/vendorApi"
import { useParams } from "react-router-dom"
import VendorForm from "../components/VendorForm"

const ViewVendorPage = () => {
  const { id } = useParams()
  const [vendor, setVendor] = useState<any>(null)

  useEffect(() => {
    getVendorById(id!).then(setVendor)
  }, [])

  return vendor && (
    <VendorForm initialData={vendor} mode="view" />
  )
}

export default ViewVendorPage