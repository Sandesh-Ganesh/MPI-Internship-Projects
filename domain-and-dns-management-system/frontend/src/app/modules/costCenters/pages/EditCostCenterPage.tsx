import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"
import CostCenterForm from "../components/CostCenterForm"
import { getCostCenterById, updateCostCenter } from "../api/costCenterApi"
import { showToast } from "../../../utils/toast"

const EditCostCenterPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [costCenter, setCostCenter] = useState<any>(null)

  useEffect(() => {
    getCostCenterById(id!).then(setCostCenter)
  }, [])

  const handleSubmit = async (data: any) => {
    try {
      await updateCostCenter(id!, data)
      showToast("Cost Center updated successfully", "success")
      navigate("/cost-centers")
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Error updating cost center", "error")
    }
  }

  return (
    <>
      <PageTitle>Edit Cost Center</PageTitle>
      <ToolbarWrapper />
      <Content>
        {costCenter && (
          <CostCenterForm
            mode="edit"
            initialData={costCenter}
            onSubmit={handleSubmit}
          />
        )}
      </Content>
    </>
  )
}

export default EditCostCenterPage