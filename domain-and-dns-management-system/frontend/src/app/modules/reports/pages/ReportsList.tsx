import { useEffect, useState } from 'react'

import {
  getOverviewReport,
  getDomainExpiryReport,
  getSslExpiryReport,
  getDnsSyncReport,
  exportDomainExpiryReport,
  exportSslExpiryReport,
} from '../api/reportApi'

const ReportsList = () => {
  const [loading, setLoading] = useState(true)

  const [overview, setOverview] = useState<any>({})
  const [domainReport, setDomainReport] = useState<any>({})
  const [sslReport, setSslReport] = useState<any>({})
  const [dnsReport, setDnsReport] = useState<any>({})

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = async () => {
    try {
      setLoading(true)

      const [
        overviewRes,
        domainRes,
        sslRes,
        dnsRes,
      ] = await Promise.all([
        getOverviewReport(),
        getDomainExpiryReport(),
        getSslExpiryReport(),
        getDnsSyncReport(),
      ])

      setOverview(overviewRes.data)
      setDomainReport(domainRes.data)
      setSslReport(sslRes.data)
      setDnsReport(dnsRes.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const downloadFile = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = filename

    document.body.appendChild(a)
    a.click()

    a.remove()
  }

  const handleDomainExport = async () => {
    const blob = await exportDomainExpiryReport()

    downloadFile(blob, 'domain-expiry-report.csv')
  }

  const handleSslExport = async () => {
    const blob = await exportSslExpiryReport()

    downloadFile(blob, 'ssl-expiry-report.csv')
  }

  if (loading) {
    return (
      <div className='card'>
        <div className='card-body'>
          Loading reports...
        </div>
      </div>
    )
  }

  return (
    <div className='container-fluid'>

      {/* Overview */}

      <div className='row g-5 mb-8'>

        <div className='col-md-2'>
          <div className='card'>
            <div className='card-body'>
              <div className='fw-semibold text-muted'>
                Domains
              </div>
              <h2>{overview.totalDomains}</h2>
            </div>
          </div>
        </div>

        <div className='col-md-2'>
          <div className='card'>
            <div className='card-body'>
              <div className='fw-semibold text-muted'>
                DNS Records
              </div>
              <h2>{overview.totalDnsRecords}</h2>
            </div>
          </div>
        </div>

        <div className='col-md-2'>
          <div className='card'>
            <div className='card-body'>
              <div className='fw-semibold text-muted'>
                SSL Certificates
              </div>
              <h2>{overview.totalSslCertificates}</h2>
            </div>
          </div>
        </div>

        <div className='col-md-2'>
          <div className='card'>
            <div className='card-body'>
              <div className='fw-semibold text-muted'>
                Vendors
              </div>
              <h2>{overview.totalVendors}</h2>
            </div>
          </div>
        </div>

        <div className='col-md-2'>
          <div className='card'>
            <div className='card-body'>
              <div className='fw-semibold text-muted'>
                Companies
              </div>
              <h2>{overview.totalCompanies}</h2>
            </div>
          </div>
        </div>

        <div className='col-md-2'>
          <div className='card'>
            <div className='card-body'>
              <div className='fw-semibold text-muted'>
                Notifications
              </div>
              <h2>{overview.totalNotifications}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Status Cards */}

      <div className='row g-5 mb-8'>

        <div className='col-md-6'>
          <div className='card h-100'>
            <div className='card-header'>
              <h3 className='card-title'>
                Domain Status
              </h3>
            </div>

            <div className='card-body'>

              <div className='mb-4'>
                <span className='badge badge-light-success me-2'>
                  Active
                </span>

                {domainReport.activeDomains}
              </div>

              <div className='mb-4'>
                <span className='badge badge-light-warning me-2'>
                  Expiring Soon
                </span>

                {domainReport.expiringWithin30Days}
              </div>

              <div>
                <span className='badge badge-light-danger me-2'>
                  Expired
                </span>

                {domainReport.expiredDomains}
              </div>

            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card h-100'>
            <div className='card-header'>
              <h3 className='card-title'>
                SSL Status
              </h3>
            </div>

            <div className='card-body'>

              <div className='mb-4'>
                <span className='badge badge-light-success me-2'>
                  Active
                </span>

                {sslReport.activeSsl}
              </div>

              <div className='mb-4'>
                <span className='badge badge-light-warning me-2'>
                  Expiring Soon
                </span>

                {sslReport.expiringWithin30Days}
              </div>

              <div>
                <span className='badge badge-light-danger me-2'>
                  Expired
                </span>

                {sslReport.expiredSsl}
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Domain Expiry */}

      <div className='card mb-8'>
        <div className='card-header d-flex justify-content-between align-items-center'>
          <h3 className='card-title'>
            Domain Expiry Report
          </h3>

          <button
            className='btn btn-sm btn-primary'
            onClick={handleDomainExport}
          >
            Export CSV
          </button>
        </div>

        <div className='card-body'>

          {domainReport.domains?.length === 0 ? (
            <div className='alert alert-success'>
              No domains expiring within 30 days.
            </div>
          ) : (
            <table className='table table-row-bordered'>
              <thead>
                <tr>
                  <th>Domain</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>

              <tbody>
                {domainReport.domains?.map(
                  (domain: any) => (
                    <tr key={domain.domain_id}>
                      <td>{domain.domain_name}</td>

                      <td>
                        {new Date(
                          domain.expiry_date
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}

        </div>
      </div>

      {/* SSL Expiry */}

      <div className='card mb-8'>
        <div className='card-header d-flex justify-content-between align-items-center'>
          <h3 className='card-title'>
            SSL Expiry Report
          </h3>

          <button
            className='btn btn-sm btn-primary'
            onClick={handleSslExport}
          >
            Export CSV
          </button>
        </div>

        <div className='card-body'>

          {sslReport.certificates?.length === 0 ? (
            <div className='alert alert-success'>
              No SSL certificates expiring within 30 days.
            </div>
          ) : (
            <table className='table table-row-bordered'>
              <thead>
                <tr>
                  <th>Domain</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>

              <tbody>
                {sslReport.certificates?.map(
                  (ssl: any) => (
                    <tr
                      key={ssl.ssl_certificate_id}
                    >
                      <td>{ssl.domain_name}</td>

                      <td>
                        {new Date(
                          ssl.expiry_date
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}

        </div>
      </div>

      {/* DNS Sync */}

      <div className='card'>
        <div className='card-header'>
          <h3 className='card-title'>
            DNS Sync Summary
          </h3>
        </div>

        <div className='card-body'>

          <div className='row'>

            <div className='col-md-3'>
              <h5>Total Syncs</h5>
              <h3>{dnsReport.totalSyncs}</h3>
            </div>

            <div className='col-md-3'>
              <h5>Successful</h5>
              <h3 className='text-success'>
                {dnsReport.successfulSyncs}
              </h3>
            </div>

            <div className='col-md-3'>
              <h5>Failed</h5>
              <h3 className='text-danger'>
                {dnsReport.failedSyncs}
              </h3>
            </div>

            <div className='col-md-3'>
              <h5>Last Sync</h5>

              <div>
                {dnsReport.lastSyncDate
                  ? new Date(
                      dnsReport.lastSyncDate
                    ).toLocaleString()
                  : 'N/A'}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default ReportsList