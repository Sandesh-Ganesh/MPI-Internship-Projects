import {FC, useEffect, useMemo, useState} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'

import {ToolbarWrapper} from '../../../_metronic/layout/components/toolbar'
import {Content} from '../../../_metronic/layout/components/content'
import {PageTitle} from '../../../_metronic/layout/core'

import {getAlerts, getRecentActivities, getSummary} from './api/dashboardApi'

import {dashboardModules} from '../../constants/dashboardModules'
import {canAccess} from '../../constants/permissions'

import {useAuth} from '../../../app/modules/auth'

type DashboardSummary = {
  totalDomains?: number
  totalDNSRecords?: number
  totalSSLCertificates?: number
  totalVendors?: number
  totalCompanies?: number
  expiringSSLs?: number
  expiredSSLs?: number
  renewedSSLs?: number
}

type ExpiringDomain = {
  domain_id: number
  domain_name: string
  expiry_date: string
  status?: string
}

type DashboardAlerts = {
  expiringDomains?: ExpiringDomain[]
  expiringSSLs?: number
}

type Activity = {
  action?: string
  log_type?: string
  entity_id?: number
  createdAt?: string
}

const formatDate = (value?: string) => {
  if (!value) {
    return '-'
  }

  return new Date(value).toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const daysUntil = (value?: string) => {
  if (!value) {
    return null
  }

  const today = new Date()
  const expiry = new Date(value)
  const diff = expiry.getTime() - today.getTime()

  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// Badge tone for activity log types (CREATE / UPDATE / DELETE / etc.)
const logTypeTone = (logType?: string) => {
  switch ((logType || '').toUpperCase()) {
    case 'CREATE':
      return 'success'
    case 'UPDATE':
      return 'primary'
    case 'DELETE':
      return 'danger'
    case 'SYNC':
      return 'info'
    default:
      return 'secondary'
  }
}

const DashboardPage: FC = () => {
  const navigate = useNavigate()
  const {currentUser} = useAuth()

  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [alerts, setAlerts] = useState<DashboardAlerts | null>(null)

  const userRole = currentUser?.role || 'USER'
  const canViewOperations = userRole === 'ADMIN' || userRole === 'MANAGER'

  const user = {
    name: currentUser?.username?.toUpperCase() || 'USER',
    role: userRole,
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      const [summaryRes, activitiesRes, alertsRes] = await Promise.all([
        getSummary(),
        canViewOperations ? getRecentActivities() : Promise.resolve({data: []}),
        canViewOperations ? getAlerts() : Promise.resolve({data: null}),
      ])

      setSummary(summaryRes?.data || null)
      setActivities(activitiesRes?.data || [])
      setAlerts(alertsRes?.data || null)
    } catch (error) {
      console.error('Dashboard fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const visibleModules = dashboardModules.filter((module) =>
    canAccess(currentUser?.role, module.roles)
  )

  const expiringDomains = alerts?.expiringDomains || []
  const expiringDomainsCount = expiringDomains.length
  const expiringSSLsCount = alerts?.expiringSSLs ?? summary?.expiringSSLs ?? 0
  const expiredSSLsCount = summary?.expiredSSLs || 0
  const renewedSSLsCount = summary?.renewedSSLs || 0
  const urgentIssues = expiringDomainsCount + expiringSSLsCount + expiredSSLsCount - renewedSSLsCount

  const healthTone = useMemo(() => {
    if (expiredSSLsCount - renewedSSLsCount > 0) {
      return {
        label: 'Action Required',
        color: 'danger',
        message: 'Expired SSL certificates need immediate review.',
      }
    }

    if (urgentIssues > 0) {
      return {
        label: 'Attention Needed',
        color: 'warning',
        message: 'Upcoming renewals or sync alerts should be checked.',
      }
    }

    return {
      label: 'Healthy',
      color: 'success',
      message: 'No urgent domain or SSL alerts detected.',
    }
  }, [expiredSSLsCount, urgentIssues])

  const overviewStats = [
    {
      title: 'Domains',
      value: summary?.totalDomains || 0,
      icon: 'ki-outline ki-element-11',
      color: 'primary',
      description: 'registered assets',
      path: '/domains',
      roles: ['ADMIN', 'MANAGER', 'USER'],
    },
    {
      title: 'DNS Records',
      value: summary?.totalDNSRecords || 0,
      icon: 'ki-outline ki-code',
      color: 'info',
      description: 'synced records',
      path: '/dns-records',
      roles: ['ADMIN', 'MANAGER', 'USER'],
    },
    {
      title: 'SSL Certificates',
      value: summary?.totalSSLCertificates || 0,
      icon: 'ki-outline ki-shield-tick',
      color: expiredSSLsCount > 0 ? 'danger' : 'success',
      description: `${expiringSSLsCount} due soon, ${renewedSSLsCount} renewed`,
      path: '/ssl-certificates',
      roles: ['ADMIN', 'MANAGER'],
    },
    {
      title: 'Vendors',
      value: summary?.totalVendors || 0,
      icon: 'ki-outline ki-shop',
      color: 'warning',
      description: 'configured vendors',
      path: '/vendors',
      roles: ['ADMIN'],
    },
  ].filter((stat) => canAccess(currentUser?.role, stat.roles))

  // Read-only, presentational status list -- no new endpoints, just
  // summarizes state we already fetch (SSL / alerts) plus static platform facts.
  const systemHealthItems = [
    {
      label: 'Authentication Active',
      state: 'good' as const,
      icon: 'ki-outline ki-shield-tick',
    },
    {
      label: 'Cloudflare Connected',
      state: 'good' as const,
      icon: 'ki-outline ki-cloud',
    },
    {
      label: 'DNS Sync Enabled',
      state: 'good' as const,
      icon: 'ki-outline ki-code',
    },
    {
      label: 'SSL Monitoring',
      state: expiredSSLsCount > 0 ? ('warn' as const) : ('good' as const),
      icon: 'ki-outline ki-shield-search',
    },
    {
      label: 'Reports Available',
      state: 'good' as const,
      icon: 'ki-outline ki-chart-simple',
    },
  ]

  return (
    <>
      <ToolbarWrapper />

      <Content>
        {/* Welcome Banner */}
        <div className='card mb-7 overflow-hidden'>
          <div className='card-body p-0'>
            <div className='d-flex flex-column flex-md-row align-items-center justify-content-between bg-primary px-10 py-15'>
              <div className='text-white'>
                <div className='d-flex align-items-center gap-3 mb-3'>
                  <h1 className='fw-bold text-white mb-0 fs-2qx'>
                    Welcome back, {user.name}
                  </h1>
                  {
                    currentUser?.role === 'ADMIN' 
                    ? <span className={`badge badge-light-${healthTone.color} fs-7 fw-bold`}>
                        {healthTone.label}
                      </span>
                    :
                    null
                  
                  }
                </div>

                <div className='fs-5 opacity-75 mb-6'>
                  Role: {user.role} &bull; Domain &amp; DNS Management System
                </div>

                <div className='d-flex flex-wrap gap-3'>
                  <button
                    className='btn btn-light btn-sm fw-bold'
                    onClick={() => navigate('/domains')}
                  >
                    <i className='ki-outline ki-element-11 fs-4 me-1' />
                    Domains
                  </button>

                  <button
                    className='btn btn-light btn-sm fw-bold'
                    onClick={() => navigate('/dns-records')}
                  >
                    <i className='ki-outline ki-code fs-4 me-1' />
                    DNS Records
                  </button>

                  {canViewOperations && currentUser?.role === 'ADMIN' && (
                    <button
                      className='btn btn-light btn-sm fw-bold'
                      onClick={() => navigate('/reports')}
                    >
                      <i className='ki-outline ki-chart-simple fs-4 me-1' />
                      Reports
                    </button>
                  )}
                </div>
              </div>

              <div className='mt-10 mt-md-0'>
                <div className='symbol symbol-100px symbol-circle border border-4 border-white'>
                  <div className='symbol-label fs-1 fw-bold bg-white text-primary'>
                    {user.name.charAt(0)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ALERTS */}
        {alerts && canViewOperations && (
          <div className='row g-5 mb-8'>
            <div className='col-xl-6'>
              <div className='card border border-warning h-100'>
                <div className='card-body d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-55px me-5 bg-light-warning'>
                      <span className='symbol-label text-warning'>
                        <i className='ki-outline ki-notification-status fs-2x' />
                      </span>
                    </div>

                    <div>
                      <div className='d-flex align-items-center gap-2 mb-1'>
                        <span className='fw-bold fs-4'>Expiring Domains</span>
                        <span className='badge badge-light-warning'>
                          {expiringDomainsCount}
                        </span>
                      </div>

                      <div className='text-gray-600'>
                        {expiringDomainsCount} domain
                        {expiringDomainsCount === 1 ? '' : 's'} expiring within 30 days
                      </div>
                    </div>
                  </div>

                  <button
                    className='btn btn-sm btn-light-warning d-none d-md-inline-block'
                    onClick={() => navigate('/domains')}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>

            <div className='col-xl-6'>
              <div className='card border border-danger h-100'>
                <div className='card-body d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-55px me-5 bg-light-danger'>
                      <span className='symbol-label text-danger'>
                        <i className='ki-outline ki-shield-cross fs-2x' />
                      </span>
                    </div>

                    <div>
                      <div className='d-flex align-items-center gap-2 mb-1'>
                        <span className='fw-bold fs-4'>Expiring SSL Certificates</span>
                        <span className='badge badge-light-danger'>
                          {expiringSSLsCount}
                        </span>
                      </div>

                      <div className='text-gray-600'>
                        {expiringSSLsCount} SSL certificate
                        {expiringSSLsCount === 1 ? '' : 's'} expiring within 30 days
                      </div>
                    </div>
                  </div>

                  <button
                    className='btn btn-sm btn-light-danger d-none d-md-inline-block'
                    onClick={() => navigate('/ssl-certificates')}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATS */}
        <div className='row g-5 g-xl-8 mb-8'>
          {overviewStats.map((stat) => (
            <div className='col-xl-3 col-md-6' key={stat.title}>
              <div
                className='card card-xl-stretch cursor-pointer hover-elevate-up'
                onClick={() => navigate(stat.path)}
              >
                <div className='card-body d-flex align-items-center'>
                  <div className={`symbol symbol-60px me-5 bg-light-${stat.color}`}>
                    <span className={`symbol-label text-${stat.color}`}>
                      <i className={`${stat.icon} fs-1`} />
                    </span>
                  </div>

                  <div className='flex-grow-1'>
                    {loading ? (
                      <div className='placeholder placeholder-glow w-100 h-25px rounded'></div>
                    ) : (
                      <div className='fw-bold fs-2x'>{stat.value}</div>
                    )}

                    <div className='text-gray-700 fw-semibold'>{stat.title}</div>

                    <div className={`text-${stat.color} fs-7 fw-bold mt-1`}>
                      {stat.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='row g-5 g-xl-8'>
          {/* MODULES */}
          <div className='col-xl-8'>
            <div className='card mb-8'>
              <div className='card-header border-0 pt-6'>
                <h3 className='card-title fw-bold fs-3'>Platform Modules</h3>
              </div>

              <div className='card-body pt-2'>
                <div className='row g-5'>
                  {visibleModules.map((module) => (
                    <div className='col-md-6' key={module.path}>
                      <div className='border border-gray-200 rounded p-6 h-100 hover-elevate-up'>
                        <div className='d-flex align-items-center mb-5'>
                          <div className={`symbol symbol-50px me-4 bg-light-${module.tone}`}>
                            <span className={`symbol-label text-${module.tone}`}>
                              <i className={`${module.icon} fs-2`} />
                            </span>
                          </div>

                          <div>
                            <h3 className='fw-bold mb-1'>{module.title}</h3>
                            <span className={`badge badge-light-${module.tone}`}>Active</span>
                          </div>
                        </div>

                        <div className='text-gray-600 fw-semibold mb-6'>
                          {module.description}
                        </div>

                        <button
                          className={`btn btn-light-${module.tone} w-100`}
                          onClick={() => navigate(module.path)}
                        >
                          Open Module
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* EXPIRING DOMAINS TABLE */}
            {canViewOperations && (
              <div className='card'>
                <div className='card-header border-0 pt-6'>
                  <div>
                    <h3 className='card-title fw-bold fs-3 mb-1'>Expiring Domains</h3>
                    <div className='text-muted fw-semibold fs-7'>
                      Domains requiring renewal attention within 30 days
                    </div>
                  </div>

                  <div className='card-toolbar'>
                    <button
                      className='btn btn-sm btn-light-primary'
                      onClick={() => navigate('/domains')}
                    >
                      View all
                    </button>
                  </div>
                </div>

                <div className='card-body pt-3'>
                  {expiringDomains.length > 0 ? (
                    <div className='table-responsive'>
                      <table className='table table-row-dashed align-middle gs-0 gy-4'>
                        <thead>
                          <tr className='fw-bold text-muted'>
                            <th>Domain</th>
                            <th>Expiry</th>
                            <th>Remaining</th>
                            <th className='text-end'>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expiringDomains.map((domain) => {
                            const remainingDays = daysUntil(domain.expiry_date)
                            const tone =
                              remainingDays !== null && remainingDays <= 7 ? 'danger' : 'warning'

                            return (
                              <tr
                                key={domain.domain_id}
                                className='cursor-pointer'
                                onClick={() => navigate(`/domains/view/${domain.domain_id}`)}
                              >
                                <td>
                                  <div className='fw-bold text-gray-900'>
                                    {domain.domain_name}
                                  </div>
                                </td>
                                <td className='text-gray-700'>{formatDate(domain.expiry_date)}</td>
                                <td>
                                  <span className={`badge badge-light-${tone}`}>
                                    {remainingDays ?? '-'} days
                                  </span>
                                </td>
                                <td className='text-end'>
                                  <span className='badge badge-light-primary'>
                                    {domain.status || 'ACTIVE'}
                                  </span>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className='d-flex align-items-center bg-light-success rounded p-6'>
                      <i className='ki-outline ki-check-circle fs-2x text-success me-4' />
                      <div>
                        <div className='fw-bold text-gray-900'>No urgent domain expiries</div>
                        <div className='text-gray-600'>
                          No domains are expiring in the current alert window.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className='col-xl-4'>
            {/* ACTIVITIES */}
            {canViewOperations && (
              <div className='card mb-8'>
                <div className='card-header border-0 pt-6'>
                  <h3 className='card-title fw-bold'>Recent Activities</h3>
                </div>

                <div className='card-body pt-2'>
                  {activities.length > 0 ? (
                    activities.slice(0, 6).map((activity, index) => (
                      <div className='d-flex align-items-start mb-6' key={index}>
                        <div
                          className={`symbol symbol-35px me-4 bg-light-${logTypeTone(
                            activity?.log_type
                          )}`}
                        >
                          <span className={`symbol-label text-${logTypeTone(activity?.log_type)}`}>
                            <i className='ki-outline ki-time fs-3' />
                          </span>
                        </div>

                        <div className='flex-grow-1'>
                          <div className='d-flex align-items-center justify-content-between gap-2'>
                            <div className='fw-semibold text-gray-800'>
                              {activity?.action || 'Activity'}
                            </div>

                            <span className={`badge badge-light-${logTypeTone(activity?.log_type)}`}>
                              {activity?.log_type || 'LOG'}
                            </span>
                          </div>

                          <div className='text-muted fs-7'>
                            {activity?.entity_id ? `Entity #${activity.entity_id} \u2022 ` : ''}
                            {activity?.createdAt
                              ? new Date(activity.createdAt).toLocaleString()
                              : '-'}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='text-muted'>No recent activities found</div>
                  )}
                </div>
              </div>
            )}

            {/* SYSTEM HEALTH (replaces the old static Demo Walkthrough card) */}
            <div className='card'>
              <div className='card-header border-0 pt-6'>
                <h3 className='card-title fw-bold'>System Health</h3>
              </div>

              <div className='card-body pt-2'>
                {systemHealthItems.map((item) => (
                  <div
                    className='d-flex align-items-center justify-content-between mb-5'
                    key={item.label}
                  >
                    <div className='d-flex align-items-center'>
                      <div
                        className={`symbol symbol-35px me-4 bg-light-${
                          item.state === 'good' ? 'success' : 'warning'
                        }`}
                      >
                        <span
                          className={`symbol-label text-${
                            item.state === 'good' ? 'success' : 'warning'
                          }`}
                        >
                          <i className={`${item.icon} fs-3`} />
                        </span>
                      </div>

                      <div className='fw-semibold text-gray-800'>{item.label}</div>
                    </div>

                    <span
                      className={`badge badge-light-${
                        item.state === 'good' ? 'success' : 'warning'
                      }`}
                    >
                      {item.state === 'good' ? 'OK' : 'Review'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>

      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
