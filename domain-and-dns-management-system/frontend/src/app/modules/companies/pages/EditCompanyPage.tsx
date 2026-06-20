import { useEffect, useState } from "react"
import { useParams, useNavigate, replace } from "react-router-dom"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"
import CompanyForm from "../components/CompanyForm"
import { getCompanyById, updateCompany } from "../api/companyApi"
import { showToast } from "../../../utils/toast"

const EditCompanyPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [company, setCompany] = useState<any>(null)

  useEffect(() => {
    getCompanyById(id!).then(setCompany)
  }, [])

  const handleSubmit = async (data: any) => {
    try {
      await updateCompany(id!, data)
      showToast("Company updated successfully", "success")
      navigate("/companies", {replace : true})
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Error updating company", "error")
    }
  }

  return (
    <>
      <PageTitle>Edit Company</PageTitle>
      <ToolbarWrapper />
      <Content>
        {company && (
          <CompanyForm
            mode="edit"
            initialData={company}
            onSubmit={handleSubmit}
          />
        )}
      </Content>
    </>
  )
}

export default EditCompanyPage