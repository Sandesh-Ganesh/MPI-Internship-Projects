import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {Content} from "../../../../_metronic/layout/components/content"
import {PageTitle} from "../../../../_metronic/layout/core"
import {getSSLCertificateById, updateSSLCertificate} from "../api/sslCertificatesApi"
import {SSLCertificateForm} from "../components/SSLCertificateForm"
import { showToast } from "../../../utils/toast"

const normalizeDate = (value?: string) => {
  return value ? value.split("T")[0] : ""
}

const normalizePayload = (form: any) => ({
  ...form,
  domain_id: Number(form.domain_id),
  vendor_id: form.vendor_id ? Number(form.vendor_id) : null,
  control_panel_id: form.control_panel_id ? Number(form.control_panel_id) : null,
  requested_by: form.requested_by ? Number(form.requested_by) : null,
  approved_by: form.approved_by ? Number(form.approved_by) : null,
})

export const EditSSLCertificatePage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        if (!id) return
        const data = await getSSLCertificateById(id)

        setForm({
          ...data,
          registered_date: normalizeDate(data.registered_date),
          expiry_date: normalizeDate(data.expiry_date),
          vendor_id: data.vendor_id || "",
          control_panel_id: data.control_panel_id || "",
          requested_by: data.requested_by || "",
          approved_by: data.approved_by || "",
          remarks: data.remarks || "",
        })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificate()
  }, [id])

  const handleSubmit = async (formData: any) => {
    try {
      setSaving(true)

      await updateSSLCertificate(id!, formData)

      //  Success toast
      showToast("SSL updated successfully", "success")

      // Navigate after short delay (optional)
      setTimeout(() => {
        navigate(`/ssl-certificates/${id}`)
      }, 800)

    } catch (error) {
      console.error(error)

      // Error toast
      showToast("Failed to update SSL certificate", "error")
    }finally{
      setSaving(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      <PageTitle>Edit SSL Certificate</PageTitle>
      <Content>
        <SSLCertificateForm 
        initialValues={form} 
        onSubmit={handleSubmit}
        mode="edit" 
        loading={saving}
        />
      </Content>
    </>
  )
}
