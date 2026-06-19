import { useNavigate } from "react-router-dom"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"
import CostCenterForm from "../components/CostCenterForm"
import { createCostCenter } from "../api/costCenterApi"
import { showToast } from "../../../utils/toast"

const CreateCostCenterPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (data: any) => {
    try {
      await createCostCenter(data)
      showToast("Cost Center created successfully", "success")
      navigate("/cost-centers", { replace:true })
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Error creating cost center", "error")
    }
  }

  return (
    <>
      <PageTitle>Create Cost Center</PageTitle>
      <ToolbarWrapper />
      <Content>
        <CostCenterForm mode="create" onSubmit={handleSubmit} />
      </Content>
    </>
  )
}

export default CreateCostCenterPage