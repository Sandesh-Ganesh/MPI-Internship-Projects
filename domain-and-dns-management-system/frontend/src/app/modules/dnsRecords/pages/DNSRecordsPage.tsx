import { useEffect, useState } from "react"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"

import { getDNSRecords, getDomains } from "../api/dnsRecordsApi"
import DNSRecordsTable from "../components/DNSRecordsTable"
import { syncAllDomains, syncDomain } from "../api/dnsRecordsApi"

const DNSRecordsPage = () => {
  const [records, setRecords] = useState<any[]>([])
  const [domains, setDomains] = useState<any[]>([])
  const [selectedDomain, setSelectedDomain] = useState("")
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [syncing, setSyncing] = useState(false)
  const [syncingDomain, setSyncingDomain] = useState(false)

  const fetchRecords = async (domainId = "", pageNumber = 1) => {
    try {
      setLoading(true)

      const res = await getDNSRecords(domainId, pageNumber)

      setRecords(res.data)
      setTotalPages(res.totalPages)
      setPage(res.page)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDomains = async () => {
    try {
      const data = await getDomains()
      setDomains(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchRecords()
    fetchDomains()
  }, [])

  const handleDomainChange = (e: any) => {
    const value = e.target.value
    setSelectedDomain(value)
    fetchRecords(value,1)   
  }

  const handleSyncAll = async () => {
    try {
      setSyncing(true)

      await syncAllDomains()

      alert("Sync started successfully") // simple for now

    } catch (error) {
      console.error(error)
      alert("Sync failed")
    } finally {
      setSyncing(false)
    }
  }
  const handleSyncDomain = async () => {
  if (!selectedDomain) return

  try {
    setSyncingDomain(true)

    await syncDomain(Number(selectedDomain))

    alert("Domain sync started")

    // refresh after small delay (since backend is async)
    setTimeout(() => {
      fetchRecords(selectedDomain, page)
    }, 2000)

  } catch (error) {
    console.error(error)
    alert("Sync failed")
  } finally {
    setSyncingDomain(false)
  }
}

  return (
    <>
      <PageTitle breadcrumbs={[]}>DNS Records</PageTitle>

      <ToolbarWrapper />

      <Content>
        <div className="mb-5 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={handleSyncAll}
            disabled={syncing}
          >
            {syncing ? "Syncing..." : "Sync All"}
          </button>
        </div>
        {/* FILTER */}
        <div className="mb-5 d-flex align-items-center gap-3">
          <select
            className="form-select"
            style={{ maxWidth: "300px" }}
            value={selectedDomain}
            onChange={handleDomainChange}
          >
            <option value="">All Domains</option>
            {domains.map((d: any) => (
              <option key={d.domain_id} value={d.domain_id}>
                {d.domain_name}
              </option>
            ))}
          </select>

          <button
            className="btn btn-light-primary"
            disabled={!selectedDomain || syncingDomain}
            onClick={handleSyncDomain}
          >
            {syncingDomain ? "Syncing..." : "Sync Domain"}
          </button>
        </div>

        {/* TABLE */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DNSRecordsTable records={records} />
        )}
        <div className="d-flex justify-content-between align-items-center mt-5">
          <button
            className="btn btn-light"
            disabled={page === 1}
            onClick={() => fetchRecords(selectedDomain, page - 1)}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-light"
            disabled={page === totalPages}
            onClick={() => fetchRecords(selectedDomain, page + 1)}
          >
            Next
          </button>
        </div>
      </Content>
    </>
  )
}

export default DNSRecordsPage