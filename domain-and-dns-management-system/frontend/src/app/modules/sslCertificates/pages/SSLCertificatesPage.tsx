import {useEffect, useMemo, useState} from "react"
import {useNavigate} from "react-router-dom"
import {Content} from "../../../../_metronic/layout/components/content"
import {ToolbarWrapper} from "../../../../_metronic/layout/components/toolbar"
import {PageTitle} from "../../../../_metronic/layout/core"
import {deactivateSSLCertificate, getSSLCertificates} from "../api/sslCertificatesApi"
import {SSLCertificatesTable} from "../components/SSLCertificatesTable"

export const SSLCertificatesPage = () => {
  const [certificates, setCertificates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const fetchCertificates = async () => {
    try {
      setLoading(true)
      const data = await getSSLCertificates()
      setCertificates(data)
    } catch (error) {
      console.error(error)
      setMessage("Unable to load SSL certificates.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  const filteredCertificates = useMemo(() => {
    const searchText = search.toLowerCase()

    return certificates.filter((cert: any) => {
      const matchesStatus = status ? cert.status === status : true
      const matchesSearch = searchText
        ? [
            cert.ssl_name,
            cert.Domain?.domain_name,
            cert.Vendor?.vendor_name,
            cert.cert_type,
          ]
            .filter(Boolean)
            .some((value: string) => value.toLowerCase().includes(searchText))
        : true

      return matchesStatus && matchesSearch
    })
  }, [certificates, search, status])

  const handleDeactivate = async (id: number) => {
    try {
      await deactivateSSLCertificate(id)
      setMessage("SSL certificate deactivated successfully.")
      fetchCertificates()
    } catch (error) {
      console.error(error)
      setMessage("Unable to deactivate SSL certificate.")
    }
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>SSL Certificates</PageTitle>
      <ToolbarWrapper />

      <Content>
        {message && <div className="alert alert-info mb-5">{message}</div>}

        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2>SSL Certificate Manager</h2>
          <button className="btn btn-danger" onClick={() => navigate("/ssl-certificates/create")}>
            Add SSL Certificate
          </button>
        </div>

        <div className="card mb-5">
          <div className="card-body d-flex flex-wrap gap-3">
            <input
              className="form-control"
              style={{ maxWidth: "320px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search SSL, domain, vendor"
            />
            <select
              className="form-select"
              style={{ maxWidth: "180px" }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="EXPIRED">EXPIRED</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
            <button
              className="btn btn-light"
              onClick={() => {
                setSearch("")
                setStatus("")
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <SSLCertificatesTable certificates={filteredCertificates} onDeactivate={handleDeactivate} />
        )}
      </Content>
    </>
  )
}
