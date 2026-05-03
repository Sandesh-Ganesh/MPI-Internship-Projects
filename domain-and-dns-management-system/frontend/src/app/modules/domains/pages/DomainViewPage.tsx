import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios"
import {Content} from "../../../../_metronic/layout/components/content"
import {PageTitle} from "../../../../_metronic/layout/core"

const API_URL = import.meta.env.VITE_APP_API_URL

export const DomainViewPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [domain, setDomain] = useState<any>(null)

  const fetchDomain = async () => {
    try {
      const res = await axios.get(`${API_URL}/domains/domains/${id}`)
      setDomain(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchDomain()
  }, [])

  if (!domain) return <p>Loading...</p>

  const getExpiryStatus = () => {
    const today = new Date()
    const expiry = new Date(domain.expiry_date)

    const diffDays =
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)

    if (diffDays < 0) return "EXPIRED"
    if (diffDays <= 30) return "EXPIRING"
    return "ACTIVE"
  }

  return (
    <>
      <PageTitle>Domain Details</PageTitle>

      <Content>

        {/* 🔙 BACK */}
        <div className="card p-5 mb-5">
          <div className="d-flex justify-content-between align-items-center">

            {/* LEFT */}
            <div>
              <h2 className="fw-bold mb-2">{domain.domain_name}</h2>

              <span className={`badge ${
                getExpiryStatus() === "EXPIRED"
                  ? "badge-light-danger"
                  : getExpiryStatus() === "EXPIRING"
                  ? "badge-light-warning"
                  : "badge-light-success"
              }`}>
                {getExpiryStatus()}
              </span>
            </div>

            {/* RIGHT */}
            <div className="d-flex gap-3">
              <button
                className="btn btn-light-primary"
                onClick={() => navigate(`/domains/edit/${domain.domain_id}`)}
              >
                Edit
              </button>

              <button
                className="btn btn-light"
                onClick={() => navigate("/domains")}
              >
                Back
              </button>
            </div>

          </div>
        </div>

        {/* 🔹 OVERVIEW */}
        <div className="card p-5 mb-5">
          <h4 className="mb-4">Overview</h4>

          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Company:</strong> {domain.Company?.company_name}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Vendor:</strong> {domain.Vendor?.vendor_name}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Control Panel:</strong> {domain.control_panel_id}
            </div>

            <div className="col-md-6 mb-3">
              <strong>DNS Panel:</strong> {domain.dns_control_panel_id}
            </div>
          </div>
        </div>

        {/* 🔹 LIFECYCLE */}
        <div className="card p-5 mb-5">
          <h4 className="mb-4">Lifecycle</h4>

          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Registered Date:</strong>{" "}
              {new Date(domain.registered_date).toLocaleDateString("en-IN")}
            </div>

            <div className="col-md-6 mb-3">
              <strong>Expiry Date:</strong>{" "}
              {new Date(domain.expiry_date).toLocaleDateString("en-IN")}
            </div>
          </div>
        </div>

      </Content>
    </>
  )
}