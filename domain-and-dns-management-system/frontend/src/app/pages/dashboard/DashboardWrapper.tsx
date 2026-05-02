import {FC} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import {ToolbarWrapper} from '../../../_metronic/layout/components/toolbar'
import {Content} from '../../../_metronic/layout/components/content'
import {PageTitle} from '../../../_metronic/layout/core'

const DashboardPage: FC = () => {
  const navigate = useNavigate()

  const modules = [
    {
      title: 'Domains',
      description: 'Manage registered domains, ownership details, expiry dates, and status.',
      path: '/domains',
      tone: 'primary',
    },
    {
      title: 'DNS Records',
      description: 'Review synced DNS records, filter by domain/type, and start DNS sync.',
      path: '/dns-records',
      tone: 'info',
    },
    {
      title: 'SSL Certificates',
      description: 'Track SSL certificates, validity dates, vendors, and renewal status.',
      path: '/ssl-certificates',
      tone: 'success',
    },
  ]

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div className='row g-5 mb-5'>
          {modules.map((module) => (
            <div className='col-md-6 col-xl-4' key={module.path}>
              <div className='card h-100'>
                <div className='card-body d-flex flex-column'>
                  <span className={`badge badge-light-${module.tone} mb-5 align-self-start`}>
                    Active Module
                  </span>
                  <h3 className='fw-bold mb-3'>{module.title}</h3>
                  <p className='text-muted flex-grow-1'>{module.description}</p>
                  <button className={`btn btn-light-${module.tone}`} onClick={() => navigate(module.path)}>
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='card'>
          <div className='card-body'>
            <h3 className='fw-bold mb-3'>Demo Checklist</h3>
            <div className='d-flex flex-column gap-3 text-gray-700'>
              <div>Login, then open Domains to show domain inventory.</div>
              <div>Open DNS Records to show filters, pagination, and sync actions.</div>
              <div>Open SSL Certificates to show certificate tracking and edit flow.</div>
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
