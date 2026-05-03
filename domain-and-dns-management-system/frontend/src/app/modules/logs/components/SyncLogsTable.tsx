type Props = {
  logs: any[]
}

const SyncLogsTable = ({ logs }: Props) => {
  return (
    <div className="card">
      <div className="card-header border-0 pt-6">
        <h2>DNS Sync Logs</h2>
      </div>

      <div className="card-body py-4">
        <table className="table align-middle table-row-dashed fs-6 gy-5">
          <thead>
            <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
              <th>Domain Name</th>
              <th>Status</th>
              <th>Message</th>
              <th>Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(logs) && logs.map((log) => (
              <tr key={log.sync_id}>
                <td>{log.Domain?.domain_name}</td>
                <td>
                  {log.status === "SUCCESS" && (
                    <span className="badge badge-light-success">SUCCESS</span>
                  )}
                  {log.status === "FAILED" && (
                    <span className="badge badge-light-danger">FAILED</span>
                  )}
                  {log.status === "PENDING" && (
                    <span className="badge badge-light-warning">PENDING</span>
                  )}
                </td>

                <td>{log.error_message || "-"}</td>

                <td>
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {Array.isArray(logs) && logs.length === 0 && (
          <div className="text-center py-10">
            No sync logs found
          </div>
        )}
      </div>
    </div>
  )
}

export default SyncLogsTable