import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'

import {ToolbarWrapper} from '../../../_metronic/layout/components/toolbar'
import {Content} from '../../../_metronic/layout/components/content'
import {PageTitle} from '../../../_metronic/layout/core'

import {
  getSummary,
  getRecentActivities,
  getAlerts,
} from './api/dashboardApi'

import {dashboardModules} from '../../constants/dashboardModules'
import {canAccess} from '../../constants/permissions'

import {useAuth} from '../../../app/modules/auth'

const DashboardPage: FC = () => {
  const navigate = useNavigate()

  const {currentUser} = useAuth()

  const [loading, setLoading] = useState(true)

  const [summary, setSummary] = useState<any>(null)
  const [activities, setActivities] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any>(null)

  const user = {
    name: currentUser?.username?.toUpperCase() || 'USER',
    role: currentUser?.role || 'USER',
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      const [summaryRes, activitiesRes, alertsRes] = await Promise.all([
        getSummary(),
        getRecentActivities(),
        getAlerts(),
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

  // ROLE-BASED MODULES
  const visibleModules = dashboardModules.filter((module) =>
    canAccess(currentUser?.role, module.roles)
  )

  // ROLE-BASED STATS
  const stats = [
    {
      title: 'Total Domains',
      value: summary?.totalDomains || 0,
      icon: 'ki-outline ki-element-11',
      color: 'primary',
      change: 'Managed domains',
      roles: ['ADMIN', 'MANAGER', 'USER'],
    },

    {
      title: 'DNS Records',
      value: summary?.totalDNSRecords || 0,
      icon: 'ki-outline ki-code',
      color: 'info',
      change: 'Synced records',
      roles: ['ADMIN', 'MANAGER', 'USER'],
    },

    {
      title: 'SSL Certificates',
      value: summary?.totalSSLCertificates || 0,
      icon: 'ki-outline ki-shield-tick',
      color: 'success',
      change: `${summary?.expiringSSLs || 0} expiring soon`,
      roles: ['ADMIN', 'MANAGER'],
    },

    {
      title: 'Active Vendors',
      value: summary?.totalVendors || 0,
      icon: 'ki-outline ki-technology',
      color: 'warning',
      change: 'Configured vendors',
      roles: ['ADMIN'],
    },
  ]

  const visibleStats = stats.filter((stat) =>
    canAccess(currentUser?.role, stat.roles)
  )

  return (
    <>
      <ToolbarWrapper />

      <Content>
        {/* Welcome Banner */}
        <div className='card mb-7 overflow-hidden'>
          <div className='card-body p-0'>
            <div className='d-flex flex-column flex-md-row align-items-center justify-content-between bg-primary px-10 py-15'>
              <div className='text-white'>
                <h1 className='fw-bold text-white mb-3 fs-2qx'>
                  Welcome back, {user.name}
                </h1>

                <div className='fs-5 opacity-75'>
                  Role: {user.role} • DNS Management System Dashboard
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
        {alerts &&
          (currentUser?.role === 'ADMIN' ||
            currentUser?.role === 'MANAGER') && (
            <div className='row g-5 mb-8'>
              <div className='col-xl-6'>
                <div className='card border border-warning'>
                  <div className='card-body'>
                    <div className='d-flex align-items-center'>
                      <i className='ki-outline ki-notification-status text-warning fs-2hx me-5'></i>

                      <div>
                        <div className='fw-bold fs-4'>
                          Expiring Domains
                        </div>

                        <div className='text-gray-600'>
                          {alerts?.expiringDomains?.length || 0} domains
                          expiring within 30 days
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SSL ALERT ONLY FOR ADMIN + MANAGER */}
              <div className='col-xl-6'>
                <div className='card border border-danger'>
                  <div className='card-body'>
                    <div className='d-flex align-items-center'>
                      <i className='ki-outline ki-shield-cross text-danger fs-2hx me-5'></i>

                      <div>
                        <div className='fw-bold fs-4'>
                          Expiring SSL Certificates
                        </div>

                        <div className='text-gray-600'>
                          {alerts?.expiringSSLs?.length || 0} SSL certificates
                          expiring within 30 days
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* STATS */}
        <div className='row g-5 g-xl-8 mb-8'>
          {visibleStats.map((stat) => (
            <div className='col-xl-3 col-md-6' key={stat.title}>
              <div className='card card-xl-stretch'>
                <div className='card-body d-flex align-items-center'>
                  <div
                    className={`symbol symbol-60px me-5 bg-light-${stat.color}`}
                  >
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

                    <div className='text-gray-600 fw-semibold'>
                      {stat.title}
                    </div>

                    <div className={`text-${stat.color} fs-7 fw-bold mt-1`}>
                      {stat.change}
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
                <h3 className='card-title fw-bold fs-3'>
                  Platform Modules
                </h3>
              </div>

              <div className='card-body pt-2'>
                <div className='row g-5'>
                  {visibleModules.map((module) => (
                    <div className='col-md-6' key={module.path}>
                      <div className='border border-gray-200 rounded p-6 h-100 hover-elevate-up'>
                        <div className='d-flex align-items-center mb-5'>
                          <div
                            className={`symbol symbol-50px me-4 bg-light-${module.tone}`}
                          >
                            <span
                              className={`symbol-label text-${module.tone}`}
                            >
                              <i className={`${module.icon} fs-2`} />
                            </span>
                          </div>

                          <div>
                            <h3 className='fw-bold mb-1'>
                              {module.title}
                            </h3>

                            <span
                              className={`badge badge-light-${module.tone}`}
                            >
                              Active
                            </span>
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
          </div>

          {/* RIGHT SIDE */}
          <div className='col-xl-4'>
            {/* ACTIVITIES */}
            {(currentUser?.role === 'ADMIN' ||
              currentUser?.role === 'MANAGER') && (
              <div className='card mb-8'>
                <div className='card-header border-0 pt-6'>
                  <h3 className='card-title fw-bold'>
                    Recent Activities
                  </h3>
                </div>

                <div className='card-body pt-2'>
                  {activities.length > 0 ? (
                    activities.map((activity, index) => (
                      <div
                        className='d-flex align-items-center mb-6'
                        key={index}
                      >
                        <div className='bullet bullet-dot bg-primary me-4 h-15px w-15px' />

                        <div className='flex-grow-1'>
                          <div className='fw-semibold text-gray-800'>
                            {activity?.action || 'Activity'}
                          </div>

                          <div className='text-muted fs-7'>
                            {new Date(
                              activity?.createdAt
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='text-muted'>
                      No recent activities found
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* DEMO FLOW */}
            <div className='card'>
              <div className='card-header border-0 pt-6'>
                <h3 className='card-title fw-bold'>
                  Demo Walkthrough
                </h3>
              </div>

              <div className='card-body pt-2'>
                <div className='timeline timeline-border-dashed'>
                  <div className='timeline-item'>
                    <div className='timeline-line'></div>

                    <div className='timeline-icon'>
                      <i className='ki-outline ki-profile-circle text-primary fs-2'></i>
                    </div>

                    <div className='timeline-content mb-8'>
                      Login & show dashboard overview
                    </div>
                  </div>

                  <div className='timeline-item'>
                    <div className='timeline-line'></div>

                    <div className='timeline-icon'>
                      <i className='ki-outline ki-code text-info fs-2'></i>
                    </div>

                    <div className='timeline-content mb-8'>
                      Show DNS sync & filtering
                    </div>
                  </div>

                  {(currentUser?.role === 'ADMIN' ||
                    currentUser?.role === 'MANAGER') && (
                    <div className='timeline-item'>
                      <div className='timeline-line'></div>

                      <div className='timeline-icon'>
                        <i className='ki-outline ki-shield-tick text-warning fs-2'></i>
                      </div>

                      <div className='timeline-content'>
                        Explain SSL expiry tracking
                      </div>
                    </div>
                  )}
                </div>
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
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.DASHBOARD'})}
      </PageTitle>

      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}