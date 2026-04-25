import {useEffect, useState} from "react"
import {getDomains} from "../api/domainsApi"
import {PageTitle} from "../../../../_metronic/layout/core"
import {Content} from "../../../../_metronic/layout/components/content"
import {ToolbarWrapper} from "../../../../_metronic/layout/components/toolbar"
import {CreateDomainModal} from "../components/CreateDomainModal"
import {useNavigate} from "react-router-dom"
import { DomainsTable } from "../components/DomainsTable"

export const DomainsPage = () => {
  const [domains, setDomains] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchDomains()
  }, [])


  const fetchDomains = async () => {
    try {
      const data = await getDomains()
      setDomains(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const breadcrumbs = [
  {
    title: "Dashboard",
    path: "/dashboard",
    isSeparator: false,
    isActive: false,
  },
]

  return (
 <>
  <PageTitle breadcrumbs={breadcrumbs}>Domains</PageTitle>
  <ToolbarWrapper />

  <Content>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <>
        {/* 🔥 HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2>Domain Manager</h2>

          <button
            className="btn btn-danger"
            onClick={() => navigate("/domains/create")}
          >
            Add New Domain
          </button>
        </div>

        {/* 🔍 SEARCH */}
        <div className="card mb-5">
          <div className="card-header">
            <h3 className="card-title">Search Domain</h3>
          </div>

          <div className="card-body d-flex gap-3">
            <input
              type="text"
              className="form-control w-300px"
              placeholder="Domain Name"
            />

            <button className="btn btn-primary">Search</button>
          </div>
        </div>

        {/* 📊 TABLE */}
        <DomainsTable domains={domains} />
      </>
    )}
  </Content>
</>
)
}