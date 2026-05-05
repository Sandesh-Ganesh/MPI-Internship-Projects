import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"
import { getCostCenterById } from "../api/costCenterApi"

const ViewCostCenterPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [costCenter, setCostCenter] = useState<any>(null)

  useEffect(() => {
    getCostCenterById(id!).then(setCostCenter)
  }, [])

  if (!costCenter) return null

  return (
    <>
      <PageTitle>View Cost Center</PageTitle>
      <ToolbarWrapper />

      <Content>

        {/* Header */}
        <div className="card mb-5">
          <div className="card-body d-flex justify-content-between">

            <div>
              <h2 className="fw-bold text-gray-900 mb-1">
                {costCenter.cost_center_name}
              </h2>

              <span className="badge badge-light-success">
                {costCenter.status}
              </span>
            </div>

            <div>
              <button
                className="btn btn-sm btn-light"
                onClick={() => navigate("/cost-centers")}
              >
                Back
              </button>

              <button
                className="btn btn-sm btn-primary ms-2"
                onClick={() => navigate(`/cost-centers/edit/${costCenter.cost_center_id}`)}
              >
                Edit
              </button>
            </div>

          </div>
        </div>

        {/* Details */}
        <div className="card">
          <div className="card-body">

            <div className="row mb-4">
              <div className="col-md-4 text-muted">Cost Center</div>
              <div className="col-md-8 fw-semibold">
                {costCenter.cost_center_name}
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 text-muted">Company </div>
              <div className="col-md-8 fw-semibold">
                {costCenter?.Company?.company_name || "-"}
              </div>
            </div>

          </div>
        </div>

      </Content>
    </>
  )
}

export default ViewCostCenterPage