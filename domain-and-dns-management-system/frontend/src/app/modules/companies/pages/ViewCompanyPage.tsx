import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"
import { getCompanyById } from "../api/companyApi"

const ViewCompanyPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [company, setCompany] = useState<any>(null)

  useEffect(() => {
    getCompanyById(id!).then(setCompany)
  }, [])

  if (!company) return null

  return (
    <>
      <PageTitle>View Company</PageTitle>
      <ToolbarWrapper />

      <Content>

        {/* Header Card */}
        <div className="card mb-5">
          <div className="card-body d-flex justify-content-between align-items-center">

            <div>
              <h2 className="fw-bold text-gray-900 mb-1">
                {company.company_name}
              </h2>

              <span className="badge badge-light-success">
                {company.status}
              </span>
            </div>

            <div>
              <button
                className="btn btn-sm btn-light"
                onClick={() => navigate("/companies")}
              >
                Back
              </button>

              <button
                className="btn btn-sm btn-primary ms-2"
                onClick={() => navigate(`/companies/edit/${company.company_id}`)}
              >
                Edit
              </button>
            </div>

          </div>
        </div>

        {/* Details Card */}
        <div className="card">
          <div className="card-body">

            <div className="row mb-4">
              <div className="col-md-4 text-muted">Company Name</div>
              <div className="col-md-8 fw-semibold">
                {company.company_name}
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 text-muted">Company Code</div>
              <div className="col-md-8 fw-semibold">
                {company.company_code}
              </div>
            </div>

          </div>
        </div>

      </Content>
    </>
  )
}

export default ViewCompanyPage