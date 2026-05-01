import {useNavigate} from "react-router-dom"
import {Content} from "../../../../_metronic/layout/components/content"
import {PageTitle} from "../../../../_metronic/layout/core"
import {createSSLCertificate} from "../api/sslCertificatesApi"
import {SSLCertificateForm} from "../components/SSLCertificateForm"

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

  const handleSubmit = async (form: any) => {
    try {
      await createSSLCertificate(normalizePayload(form))
      navigate("/ssl-certificates")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <PageTitle>Create SSL Certificate</PageTitle>
      <Content>
        <SSLCertificateForm initialValues={initialValues} onSubmit={handleSubmit} />
      </Content>
    </>
  )
}
