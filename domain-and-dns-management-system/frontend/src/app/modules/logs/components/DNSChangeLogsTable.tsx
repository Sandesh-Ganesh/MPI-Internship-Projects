import { useState } from "react"

type Props = {
  logs: any[]
}

const DNSChangeLogsTable = ({ logs }: Props) => {
  const [filter, setFilter] = useState("ALL")

  const filteredLogs =
    filter === "ALL"
      ? logs
      : logs.filter((log) => log.action === filter)

  const normalize = (val: any) =>
    typeof val === "string" ? val.trim().toLowerCase() : val

  const getChanges = (oldValue: any, newValue: any) => {
    if (!oldValue && newValue) {
      return [{ field: "Created", old: "-", new: "New DNS record added" }]
    }

    if (oldValue && !newValue) {
      return [{ field: "Deleted", old: "Record existed", new: "-" }]
    }

    if (!oldValue || !newValue) return []

    const changes: any[] = []

    const keys = [
      "dns_name",
      "record_type",
      "record_value",
      "ttl",
      "proxied",
    ]

    keys.forEach((key) => {
      if (normalize(oldValue[key]) !== normalize(newValue[key])) {
        changes.push({
          field: key,
          old: oldValue[key],
          new: newValue[key],
        })
      }
    })

    return changes
  }

  return (
    <div className="card">
      <div className="card-header border-0 pt-6">
        <div className="card-title">
          <h2>DNS Change Logs</h2>
        </div>

        <div className="card-toolbar">
          <select
            className="form-select form-select-sm w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="CREATE">Create</option>
            <option value="UPDATE">Update</option>
            <option value="DELETE">Delete</option>
          </select>
        </div>
      </div>

      <div className="card-body py-4">
        <table className="table align-middle table-row-dashed fs-6 gy-5">
          <thead>
            <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
              <th>Domain</th>
              <th>Action</th>
              <th>Record</th>
              <th>Changes</th>
              <th>Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.map((log) => {
              const changes = getChanges(log.old_value, log.new_value)

              return (
                <tr key={log.id}>
                  <td>
                    {log.domain?.domain_name || log.domain_id}
                  </td>

                  <td>
                    {log.action === "CREATE" && (
                      <span className="badge badge-light-success">
                        CREATE
                      </span>
                    )}
                    {log.action === "UPDATE" && (
                      <span className="badge badge-light-warning">
                        UPDATE
                      </span>
                    )}
                    {log.action === "DELETE" && (
                      <span className="badge badge-light-danger">
                        DELETE
                      </span>
                    )}
                  </td>

                  <td>
                    <div>
                      <strong>{log.new_value?.dns_name || log.old_value?.dns_name}</strong>
                      <div className="text-muted fs-7">
                        {log.new_value?.record_type || log.old_value?.record_type}
                      </div>
                    </div>
                  </td>

                  <td>
                    {changes.length === 0 ? (
                      <span className="text-muted">No changes</span>
                    ) : (
                      changes.map((change: any, i: number) => (
                        <div key={i}>
                          <strong>{change.field}</strong>:{" "}
                          <span className="text-danger">
                            {String(change.old)}
                          </span>{" "}
                          →{" "}
                          <span className="text-success">
                            {String(change.new)}
                          </span>
                        </div>
                      ))
                    )}
                  </td>

                  <td>
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filteredLogs.length === 0 && (
          <div className="text-center py-10">
            No DNS changes found
          </div>
        )}
      </div>
    </div>
  )
}

export default DNSChangeLogsTable