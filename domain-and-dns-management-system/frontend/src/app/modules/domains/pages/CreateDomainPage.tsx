import {useNavigate} from "react-router-dom"
import axios from "axios"

import {Content} from "../../../../_metronic/layout/components/content"
import {PageTitle} from "../../../../_metronic/layout/core"
import {DomainForm} from "../components/DomainForm"
import {showToast} from "../../../utils/toast"

const API_URL = import.meta.env.VITE_APP_API_URL

export const CreateDomainPage = () => {
  const navigate = useNavigate()

  const initialValues = {
    domain_name: "",
    zone_id: "",
    api_token: "",
    company_id: "",
    cost_center_id: "",
    vendor_id: "",
    control_panel_id: "",
    dns_control_panel_id: "",
    requested_by: "",
    approved_by: "",
    usage_flag: "INTERNAL",
    registered_date: "",
    expiry_date: "",
    remarks: "",
    status: "ACTIVE",
  }

  const handleSubmit = async (form: any) => {
    try {
      await axios.post(`${API_URL}/domains/domains`, {
        ...form,
        company_id: Number(form.company_id),
        cost_center_id: Number(form.cost_center_id),
        vendor_id: Number(form.vendor_id),
        control_panel_id: Number(form.control_panel_id),
        dns_control_panel_id: Number(form.dns_control_panel_id),
        requested_by: Number(form.requested_by),
        approved_by: form.approved_by ? Number(form.approved_by) : null,
      })

      showToast("Domain created successfully")

      navigate("/domains")
    } catch (err) {
      console.error(err)
      showToast("Failed to create domain", "error")
    }
  }

  return (
    <>
      <PageTitle>Create Domain</PageTitle>

      <Content>
        <DomainForm initialValues={initialValues} onSubmit={handleSubmit} />
      </Content>
    </>
  )
}