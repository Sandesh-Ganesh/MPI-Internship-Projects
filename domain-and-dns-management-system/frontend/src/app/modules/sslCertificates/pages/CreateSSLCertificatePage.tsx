import {useNavigate} from "react-router-dom"
import {Content} from "../../../../_metronic/layout/components/content"
import {PageTitle} from "../../../../_metronic/layout/core"
import {createSSLCertificate} from "../api/sslCertificatesApi"
import {SSLCertificateForm} from "../components/SSLCertificateForm"
import {showToast} from "../../../utils/toast"
import { useState } from "react"
const initialValues = {
  domain_id: "",
  ssl_name: "",
  cert_type: "DV",
  validation_type: "DNS",
  encryption_type: "RSA",
  registered_date: "",
  expiry_date: "",
  vendor_id: "",
  control_panel_id: "",
  requested_by: "",
  approved_by: "",
  remarks: "",
  status: "ACTIVE",
}

const normalizePayload = (form: any) => ({
  ...form,
  domain_id: Number(form.domain_id),
  vendor_id: form.vendor_id ? Number(form.vendor_id) : null,
  control_panel_id: form.control_panel_id ? Number(form.control_panel_id) : null,
  requested_by: form.requested_by ? Number(form.requested_by) : null,
  approved_by: form.approved_by ? Number(form.approved_by) : null,
})

export const CreateSSLCertificatePage = () => {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (form: any) => {
    try {
      setSaving(true)

      await createSSLCertificate(normalizePayload(form))
      // ✅ Success toast
      showToast("SSL created successfully", "success")

      // Navigate after short delay (optional)
      setTimeout(() => {
        navigate(`/ssl-certificates/`, { replace:true })
      }, 1000)
  
    } catch (error) {
      console.error(error)
      showToast("Failed to update SSL certificate", "error")
    }finally{
      setSaving(false)
    }
  }

  return (
    <>
      <PageTitle>Create SSL Certificate</PageTitle>
      <Content>
        <SSLCertificateForm 
          initialValues={initialValues}
          onSubmit={handleSubmit}
          mode="edit"
          loading={saving}
        />
      </Content>
    </>
  )
}
