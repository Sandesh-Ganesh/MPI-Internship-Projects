import { useEffect, useState } from "react"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"

import { getDNSChangeLogs } from "../api/dnsChangeLogsApi"
import DNSChangeLogsTable from "../components/DNSChangeLogsTable"

export const DNSChangeLogsPage = () => {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchLogs = async () => {
    try {
      setLoading(true)

      const data = await getDNSChangeLogs({
        limit: 50,
      })

      setLogs(data.logs || [])
    } catch (error) {
      console.error("Error fetching DNS change logs", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return (
    <>
      <PageTitle>DNS Change Logs</PageTitle>

      <ToolbarWrapper />

      <Content>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DNSChangeLogsTable
            logs={logs}
          />
        )}
      </Content>
    </>
  )
}

