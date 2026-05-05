import { useNavigate } from "react-router-dom"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"
import CompanyForm from "../components/CompanyForm"
import { createCompany } from "../api/companyApi"
import { showToast } from "../../../utils/toast"

const CreateCompanyPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (data: any) => {
    try {
      await createCompany(data)
      showToast("Company created successfully", "success")
      navigate("/companies")
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Error creating company", "error")
    }
  }

  return (
    <>
      <PageTitle>Create Company</PageTitle>
      <ToolbarWrapper />
      <Content>
        <CompanyForm mode="create" onSubmit={handleSubmit} />
      </Content>
    </>
  )
}

export default CreateCompanyPage