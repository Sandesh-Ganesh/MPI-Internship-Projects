import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"
import ControlPanelList from "../components/ControlPanelList"

export const ControlPanelsPage = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Control Panels</PageTitle>

      <ToolbarWrapper />

      <Content>
        <ControlPanelList  />
      </Content>
    </>
  )
}
