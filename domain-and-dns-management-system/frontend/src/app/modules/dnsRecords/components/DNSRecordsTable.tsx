const DNSRecordsTable = ({ records, hideDomain = false }: any) => {
  
  return (
    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
        <table className="table align-middle table-row-dashed fs-6 gy-5 table-nowrap">
          <thead>
            <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
              <th>ID</th>
              {!hideDomain && <th>Domain</th>}
              <th>Name</th>
              <th>Type</th>
              <th>Value</th>
              <th>TTL</th>
              <th>Proxy</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 fw-semibold">
            {records?.length > 0 ? (
              records.map((record: any) => (
                <tr key={record.dns_id}>
                  <td>{record.dns_id}</td>
                  {!hideDomain && (
                    <td>{record.domain?.domain_name}</td>
                    )}
                  <td>{record.dns_name}</td>
                  <td>{record.record_type}</td>
                  <td className="text-truncate" style={{ maxWidth: "150px" }}>{record.record_value}</td>
                  <td>{record.ttl || "-"}</td>
                  <td>{record.proxied ? "Yes" : "No"}</td>
                  <td>
                    <span className={`badge ${record.status === "ACTIVE" ? "badge-light-success" : "badge-light-danger"}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
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
