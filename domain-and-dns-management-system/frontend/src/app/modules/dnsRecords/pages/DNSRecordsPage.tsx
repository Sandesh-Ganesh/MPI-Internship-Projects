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
  const [recordType, setRecordType] = useState("")
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState("")

  const fetchRecords = async (domainId = selectedDomain, pageNumber = 1, type = recordType, searchText = search) => {
    try {
      setLoading(true)
      setMessage("")

      const res = await getDNSRecords(domainId, pageNumber, 10, type, searchText)

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
    fetchRecords(value, 1)   
  }

  const handleTypeChange = (e: any) => {
    const value = e.target.value
    setRecordType(value)
    fetchRecords(selectedDomain, 1, value, search)
  }

  const handleSearch = () => {
    fetchRecords(selectedDomain, 1, recordType, search)
  }

  const handleSyncAll = async () => {
    try {
      setSyncing(true)

      await syncAllDomains()

      setMessage("Sync all started successfully.")

    } catch (error) {
      console.error(error)
      setMessage("Sync failed. Please check backend logs.")
    } finally {
      setSyncing(false)
    }
  }
  const handleSyncDomain = async () => {
  if (!selectedDomain) return

  try {
    setSyncingDomain(true)

    await syncDomain(Number(selectedDomain))

    setMessage("Domain sync started.")

    // refresh after small delay (since backend is async)
    setTimeout(() => {
      fetchRecords(selectedDomain, page)
    }, 2000)

  } catch (error) {
    console.error(error)
    setMessage("Sync failed. Please check backend logs.")
  } finally {
    setSyncingDomain(false)
  }
}

  return (
    <>
      <PageTitle breadcrumbs={[]}>DNS Records</PageTitle>

      <ToolbarWrapper />

      <Content>
        {message && (
          <div className="alert alert-info d-flex align-items-center mb-5">
            <span>{message}</span>
          </div>
        )}

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
        <div className="mb-5 d-flex flex-wrap align-items-center gap-3">
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

          <select
            className="form-select"
            style={{ maxWidth: "160px" }}
            value={recordType}
            onChange={handleTypeChange}
          >
            <option value="">All Types</option>
            <option value="A">A</option>
            <option value="AAAA">AAAA</option>
            <option value="CNAME">CNAME</option>
            <option value="MX">MX</option>
            <option value="TXT">TXT</option>
            <option value="NS">NS</option>
          </select>

          <input
            className="form-control"
            style={{ maxWidth: "260px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch()
            }}
            placeholder="Search DNS name or value"
          />

          <button className="btn btn-light" onClick={handleSearch}>
            Search
          </button>

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
