import { useEffect, useState } from "react"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"

import { getDNSRecords } from "../api/dnsRecordsApi"
import DNSRecordsTable from "../components/DNSRecordsTable"

const DNSRecordsPage = () => {
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchRecords = async () => {
    try {
      setLoading(true)
      const data = await getDNSRecords()
      setRecords(data)
    } catch (error) {
      console.error("Error fetching DNS records:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={[]}>DNS Records</PageTitle>

      <ToolbarWrapper />

      <Content>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DNSRecordsTable records={records} />
        )}
      </Content>
    </>
  )
}

export default DNSRecordsPage