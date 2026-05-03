import { useState } from "react"

type Props = {
  logs: any[],
  title?: string,
  showDropDown?: boolean,
}

const IGNORED_FIELDS = ["createdAt", "updatedAt"]

const getChanges = (oldValue: any, newValue: any) => {
  if (!oldValue && newValue) {
    return [{ field: "Created", old: "-", new: "New record created" }]
  }

  if (oldValue && !newValue) {
    return [{ field: "Deleted", old: "Record existed", new: "-" }]
  }

  if (!oldValue || !newValue) return []

  const changes: any[] = []

  Object.keys(newValue).forEach((key) => {
    if (IGNORED_FIELDS.includes(key)) return

    if (oldValue[key] !== newValue[key]) {
      changes.push({
        field: key,
        old: oldValue[key],
        new: newValue[key],
      })
    }
  })

  return changes
}

const ActivityLogsTable = ({ logs , title, showDropDown = true }: Props) => {
  const [filter, setFilter] = useState("ALL")

  const filteredLogs =
    filter === "ALL"
      ? logs
      : logs.filter((log) => log.log_type === filter)

  return (
    <div className="card">
      <div className="card-header border-0 pt-6">
        <div className="card-title">
          {title || "Activity Logs"}
        </div>
        { showDropDown && 
        <div className="card-toolbar">
          <select
            className="form-select form-select-sm w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="DOMAIN">Domain</option>
            <option value="SSL">SSL</option>
            <option value="DNS">DNS</option>
          </select>
        </div>
        }
      </div>
        
      <div className="card-body py-4">
        <table className="table align-middle table-row-dashed fs-6 gy-5">
          <thead>
            <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
              <th>Type</th>
              <th>Action</th>
              <th>Entity ID</th>
              <th>User</th>
              <th>Timestamp</th>
              <th>Old Value</th>
              <th>New Value</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 fw-semibold">
            {Array.isArray(filteredLogs) && filteredLogs.map((log) => (
              <tr key={log.log_id}>
                <td>{log.log_type}</td>
                <td>
                    {log.action === "CREATE" && (
                        <span className="badge badge-light-success">CREATE</span>
                    )}
                    {log.action === "UPDATE" && (
                        <span className="badge badge-light-warning">UPDATE</span>
                    )}
                    {log.action === "DELETE" && (
                        <span className="badge badge-light-danger">DELETE</span>
                    )}
                </td>
                <td>{log.entity_id}</td>
                <td>{log.user_id}</td>
                <td>
                  {new Date(log.createdAt).toLocaleString("en-In")}
                </td>
                <td colSpan={2}>
                {(() => {
                    const changes = getChanges(log.old_value, log.new_value)

                    if (changes.length === 0) {
                    return <span className="text-muted">No changes</span>
                    }

                    return (
                    <div>
                        {changes.map((change, index) => (
                        <div key={index} className="mb-1">
                            <strong>{change.field}</strong>:{" "}
                            <span className="text-danger">{String(change.old)}</span>{" "}
                            →{" "}
                            <span className="text-success">{String(change.new)}</span>
                        </div>
                        ))}
                    </div>
                    )
                })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLogs.length === 0 && (
          <div className="text-center py-10">
            No logs found
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityLogsTable