import { useEffect, useState } from "react"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"

import { getDNSRecords, getDomains } from "../api/dnsRecordsApi"
import DNSRecordsTable from "../components/DNSRecordsTable"

const DNSRecordsPage = () => {
  const [records, setRecords] = useState<any[]>([])
  const [domains, setDomains] = useState<any[]>([])
  const [selectedDomain, setSelectedDomain] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)

      const [recordsData, domainsData] = await Promise.all([
        getDNSRecords(),
        getDomains(),
      ])

      setRecords(recordsData)
      setDomains(domainsData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Filter logic
  const filteredRecords = selectedDomain
    ? records.filter((r) => r.domain_id === Number(selectedDomain))
    : records

  return (
    <>
      <PageTitle breadcrumbs={[]}>DNS Records</PageTitle>

      <ToolbarWrapper />

      <Content>
        {/* FILTER */}
        <div className="mb-5">
          <select
            className="form-select"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
          >
            <option value="">All Domains</option>
            {domains.map((d: any) => (
              <option key={d.id} value={d.id}>
                {d.domain_name}
              </option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DNSRecordsTable
            records={filteredRecords}
            domains={domains}
          />
        )}
      </Content>
    </>
  )
}

export default DNSRecordsPage