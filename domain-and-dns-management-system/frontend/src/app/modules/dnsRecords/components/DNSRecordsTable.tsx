import React from "react"

const DNSRecordsTable = ({ records }: any) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
        <table className="table align-middle table-row-dashed fs-6 gy-5 table-nowrap">
          <thead>
            <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
              <th>ID</th>
              <th>Domain</th>
              <th>Type</th>
              <th>Value</th>
              <th>TTL</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 fw-semibold">
            {records?.length > 0 ? (
              records.map((record: any) => (
                <tr key={record.id}>
                  <td>{record.dns_id}</td>
                  <td>{record.domain_id}</td>
                  <td>{record.record_type}</td>
                  <td className="text-truncate" style={{ maxWidth: "150px" }}>{record.record_value}</td>
                  <td>{record.ttl}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

export default DNSRecordsTable