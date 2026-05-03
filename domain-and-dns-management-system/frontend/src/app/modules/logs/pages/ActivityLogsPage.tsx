import { useEffect, useState } from "react"
import { PageTitle } from "../../../../_metronic/layout/core"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { Content } from "../../../../_metronic/layout/components/content"

import ActivityLogsTable from "../components/ActivityLogsTable"
import { getActivityLogs } from "../api/activityLogsApi"

export const ActivityLogsPage = () => {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchLogs = async () => {
    try {
      setLoading(true)
      const data = await getActivityLogs()
      setLogs(data.logs || [])
    } catch (error) {
      console.error("Error fetching logs", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return (
    <>
      <PageTitle>Activity Logs</PageTitle>

      <ToolbarWrapper />

      <Content>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ActivityLogsTable logs={logs} />
        )}
      </Content>
    </>
  )
}
