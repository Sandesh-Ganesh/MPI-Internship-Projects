import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"
import CostCenterList from "../components/CostCenterList"
import {useNavigate} from "react-router-dom"
const CostCentersPage = () => {
  const navigate = useNavigate()
  
  const handleView = (id: number) => {
    navigate(`/cost-centers/view/${id}`)
  }
  return (
    <>
      <PageTitle>Cost Centers</PageTitle>
      <ToolbarWrapper />
      <Content>
        <CostCenterList onView={handleView} />
      </Content>
    </>
  )
}

export default CostCentersPage