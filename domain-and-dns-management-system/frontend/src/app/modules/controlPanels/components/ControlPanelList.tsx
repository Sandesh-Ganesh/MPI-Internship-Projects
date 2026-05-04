import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getControlPanels, deleteControlPanel } from "../api/controlPanelApi"
import { showToast } from "../../../utils/toast"

const ControlPanelList = () => {
  const [panels, setPanels] = useState<any[]>([])
  const navigate = useNavigate()

  const fetchData = async () => {
    const data = await getControlPanels()
    setPanels(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    await deleteControlPanel(id)
    showToast("Control Panel deactivated", "success")
    fetchData()
  }

  return (
    <div className="card">
      <div className="card-header border-0 pt-6">

        <div className="card-title">
          <h2 className="fw-bold">Control Panels</h2>
        </div>

        <div className="card-toolbar">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate("/control-panels/create")}
          >
            + Add Control Panel
          </button>
        </div>

      </div>

      <div className="card-body">
        <table className="table align-middle table-row-dashed fs-6 gy-5 table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>DNS</th>
              <th>Hosting</th>
              <th>SSL</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {panels.length === 0 && (
              <div className="text-center py-10">
                <div className="text-muted">No control panels found</div>
              </div>
            )}
            {panels.map((p) => (
              <tr key={p.control_panel_id}>
                <td>
                  <div className="d-flex flex-column">
                    <span className="fw-bold text-gray-900">
                      {p.panel_name}
                    </span>
                    <span className="text-muted fs-7">
                      {p.Vendor?.vendor_name || "-"}
                    </span>
                  </div>
                </td>
                <td>
                  {p.dns_flag && <span className="badge badge-light-success me-1">DNS</span>}
                </td>

                <td>
                  {p.hosting_flag ? <span className="badge badge-light-info me-1">Hosting</span> : "NO" }
                </td>

                <td>
                  {p.ssl_flag && <span className="badge badge-light-warning">SSL</span>}
                </td>

                <td>{p.status}</td>

                <td>
                  <div className="dropdown">
                    <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm " data-bs-toggle="dropdown">
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                    <div className="dropdown-menu">
                      <button className="dropdown-item" onClick={() => navigate(`/control-panels/view/${p.control_panel_id}`)}>View</button>
                      <button className="dropdown-item" onClick={() => navigate(`/control-panels/edit/${p.control_panel_id}`)}>Edit</button>
                      <button className="dropdown-item text-danger" onClick={() => handleDelete(p.control_panel_id)}>Delete</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ControlPanelList