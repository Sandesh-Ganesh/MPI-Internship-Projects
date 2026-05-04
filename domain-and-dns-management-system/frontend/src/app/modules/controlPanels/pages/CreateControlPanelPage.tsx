import ControlPanelForm from "../components/ControlPanelForm"
import { createControlPanel } from "../api/controlPanelApi"
import { useNavigate } from "react-router-dom"
import { showToast } from "../../../utils/toast"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"

const CreateControlPanelPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (data: any) => {
    try {
      await createControlPanel(data)
      showToast("Control Panel created successfully", "success")
      navigate("/control-panels")
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Error creating control panel", "error")
    }
  }

  return (
    <>
      <PageTitle>Create Control Panel</PageTitle>
      <ToolbarWrapper />
      <Content>
        <ControlPanelForm mode="create" onSubmit={handleSubmit} />
      </Content>
    </>
  )
}

export default CreateControlPanelPage