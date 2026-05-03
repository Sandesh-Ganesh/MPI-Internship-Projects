import { useEffect, useState } from "react"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"

import SyncLogsTable from "../components/SyncLogsTable"
import { getSyncLogs } from "../api/syncLogsApi"

export const SyncLogsPage = () => {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchLogs = async () => {
    try {
      setLoading(true)
      const data = await getSyncLogs({limit:50})

      // If backend returns { logs: [] }
      setLogs(data.logs || [])
    } catch (error) {
      console.error("Error fetching sync logs", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return (
    <>
      <PageTitle>DNS Sync Logs</PageTitle>

      <ToolbarWrapper />

      <Content>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <SyncLogsTable logs={logs} />
        )}
      </Content>
    </>
  )
}
