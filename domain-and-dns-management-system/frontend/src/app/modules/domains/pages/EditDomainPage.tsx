import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"

import {Content} from "../../../../_metronic/layout/components/content"
import {PageTitle} from "../../../../_metronic/layout/core"
import {DomainForm} from "../components/DomainForm"

const API_URL = import.meta.env.VITE_APP_API_URL

export const EditDomainPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<any>(null)

  const fetchDomain = async () => {
    try {
      const res = await axios.get(`${API_URL}/domains/domains/${id}`)
      const data = res.data

      setForm({
        ...data,
        registered_date: data.registered_date?.split("T")[0],
        expiry_date: data.expiry_date?.split("T")[0],
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDomain()
  }, [])

  const handleUpdate = async (form: any) => {
    try {
      await axios.put(`${API_URL}/domains/domains/${id}`, {
        ...form,
        company_id: Number(form.company_id),
        cost_center_id: Number(form.cost_center_id),
        vendor_id: Number(form.vendor_id),
        control_panel_id: Number(form.control_panel_id),
        dns_control_panel_id: Number(form.dns_control_panel_id),
        requested_by: Number(form.requested_by),
        approved_by: form.approved_by ? Number(form.approved_by) : null,
      })

      navigate("/domains")
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <>
      <PageTitle>Edit Domain</PageTitle>

      <Content>
        <DomainForm initialValues={form} onSubmit={handleUpdate} />
      </Content>
    </>
  )
}