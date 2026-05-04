import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ControlPanelForm from "../components/ControlPanelForm"
import { getControlPanelById, updateControlPanel } from "../api/controlPanelApi"
// import { toast } from "../../../components/toast"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"

const EditControlPanelPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [panel, setPanel] = useState<any>(null)

  useEffect(() => {
    getControlPanelById(id!).then(setPanel)
  }, [])

  const handleSubmit = async (data: any) => {
    try {
      await updateControlPanel(id!, data)
    //   toast.success("Control Panel updated successfully")
      navigate("/control-panels")
    } catch (error: any) {
    //   toast.error(error?.response?.data?.message || "Error updating control panel")
    }
  }

  return (
    <>
      <PageTitle>Edit Control Panel</PageTitle>
      <ToolbarWrapper />
      <Content>
        {panel && (
          <ControlPanelForm
            mode="edit"
            initialData={panel}
            onSubmit={handleSubmit}
          />
        )}
      </Content>
    </>
  )
}

export default EditControlPanelPage