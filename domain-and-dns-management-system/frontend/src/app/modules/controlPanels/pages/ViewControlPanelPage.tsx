import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ControlPanelForm from "../components/ControlPanelForm"
import { getControlPanelById } from "../api/controlPanelApi"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"

const ViewControlPanelPage = () => {
  const { id } = useParams()
  const [panel, setPanel] = useState<any>(null)

  useEffect(() => {
    getControlPanelById(id!).then(setPanel)
  }, [])

  return (
    <>
      <PageTitle>View Control Panel</PageTitle>
      <ToolbarWrapper />
      <Content>
        {panel && <ControlPanelForm mode="view" initialData={panel} />}
      </Content>
    </>
  )
}

export default ViewControlPanelPage