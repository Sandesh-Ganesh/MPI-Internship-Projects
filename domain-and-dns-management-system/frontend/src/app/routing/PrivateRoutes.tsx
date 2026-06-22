import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {DomainsPage} from "../modules/domains/pages/DomainsPage"
import {CreateDomainPage} from "../modules/domains/pages/CreateDomainPage"
import { EditDomainPage } from '../modules/domains/pages/EditDomainPage'
import DNSRecordsPage from '../modules/dnsRecords/pages/DNSRecordsPage'
import {SSLCertificatesPage} from '../modules/sslCertificates/pages/SSLCertificatesPage'
import {CreateSSLCertificatePage} from '../modules/sslCertificates/pages/CreateSSLCertificatePage'
import {EditSSLCertificatePage} from '../modules/sslCertificates/pages/EditSSLCertificatePage'
import { DomainViewPage } from '../modules/domains/pages/DomainViewPage'
import {SSLCertificateTimelinePage} from "../modules/sslCertificates/pages/SSLCertificateTimelinePage"
import { SSLCertificateViewPage } from '../modules/sslCertificates/pages/SSLCertificateViewPage'
import { ActivityLogsPage } from '../modules/logs/pages/ActivityLogsPage'
import { SyncLogsPage } from '../modules/logs/pages/SyncLogsPage'
import { DNSChangeLogsPage } from '../modules/logs/pages/DNSChangeLogsPage'
import { ControlPanelsPage } from '../modules/controlPanels/pages/ControlPanelsPage'
import CreateControlPanelPage from '../modules/controlPanels/pages/CreateControlPanelPage'
import ViewControlPanelPage from '../modules/controlPanels/pages/ViewControlPanelPage'
import EditControlPanelPage from '../modules/controlPanels/pages/EditControlPanelPage'
import VendorsPage from '../modules/vendors/pages/VendorsPage'
import EditVendorPage from '../modules/vendors/pages/EditVendorPage'
import ViewVendorPage from '../modules/vendors/pages/ViewVendorPage'
import CreateVendorPage from '../modules/vendors/pages/CreateVendorPage'
import CompaniesPage from '../modules/companies/pages/CompaniesPage'
import CreateCompanyPage from '../modules/companies/pages/CreateCompanyPage'
import EditCompanyPage from '../modules/companies/pages/EditCompanyPage'
import ViewCompanyPage from '../modules/companies/pages/ViewCompanyPage'
import ViewCostCenterPage from '../modules/costCenters/pages/ViewCostCenterPage'
import EditCostCenterPage from '../modules/costCenters/pages/EditCostCenterPage'
import CreateCostCenterPage from '../modules/costCenters/pages/CreateCostCenterPage'
import CostCentersPage from '../modules/costCenters/pages/CostCentersPage'
import UsersPage from '../modules/users/pages/UsersPage'
import RoleGuard from './RoleGuard'
import NotificationList from '../modules/notifications/pages/NotifcationList'
import ReportsList from '../modules/reports/pages/ReportsList'

const PrivateRoutes = () => {
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='/users' element={
          <RoleGuard roles={['ADMIN']}>
            <UsersPage/>
          </RoleGuard>
        } />
        <Route path='/companies' element={
          <RoleGuard roles={['ADMIN', 'MANAGER']}>
            <CompaniesPage/>
          </RoleGuard>
        } />
        <Route path="/companies/create" element={
          <RoleGuard roles={['ADMIN']}>
            <CreateCompanyPage/>
          </RoleGuard>
        } />
        <Route path="/companies/view/:id" element={
          <RoleGuard roles={['ADMIN', 'MANAGER']}>
            <ViewCompanyPage/>
          </RoleGuard>
        } />
        <Route path="/companies/edit/:id" element={
          <RoleGuard roles={['ADMIN']}>
            <EditCompanyPage/>
          </RoleGuard>
        } />
        <Route path="/cost-centers" element={
          <RoleGuard roles={['ADMIN', 'MANAGER']}>
            <CostCentersPage/>
          </RoleGuard>
        } />
        <Route path="/cost-centers/create" element={
          <RoleGuard roles={['ADMIN']}>
            <CreateCostCenterPage/>
          </RoleGuard>
        } />
        <Route path="/cost-centers/edit/:id" element={
          <RoleGuard roles={['ADMIN']}>
            <EditCostCenterPage/>
          </RoleGuard>
        } />
        <Route path="/cost-centers/view/:id" element={
          <RoleGuard roles={['ADMIN', 'MANAGER']}>
            <ViewCostCenterPage/>
          </RoleGuard>
        } />
        <Route path='/control-panels' element={
          <RoleGuard roles={['ADMIN', 'MANAGER']}>
            <ControlPanelsPage/>
          </RoleGuard>
        } />
        <Route path="/control-panels/create" element={
          <RoleGuard roles={['ADMIN']}>
            <CreateControlPanelPage/>
          </RoleGuard>
        } />
        <Route path="/control-panels/edit/:id" element={
          <RoleGuard roles={['ADMIN']}>
            <EditControlPanelPage/>
          </RoleGuard>
        } />
        <Route path="/control-panels/view/:id" element={
          <RoleGuard roles={['ADMIN', 'MANAGER']}>
            <ViewControlPanelPage/>
          </RoleGuard>
        } />
        <Route path="/vendors" element={
          <RoleGuard roles={['ADMIN', 'MANAGER']}>
            <VendorsPage/>
          </RoleGuard>
        } />
        <Route path="/vendors/create" element={
          <RoleGuard roles={['ADMIN']}>
            <CreateVendorPage/>
          </RoleGuard>
        } />
        <Route path="/vendors/view/:id" element={
          <RoleGuard roles={['ADMIN', 'MANAGER']}>
            <ViewVendorPage/>
          </RoleGuard>
        } />
        <Route path="/vendors/edit/:id" element={
          <RoleGuard roles={['ADMIN']}>
            <EditVendorPage/>
          </RoleGuard>
        } />
        <Route path='/domains' element={
            <DomainsPage/>
        } />

        <Route path="/domains/create" element={
          <RoleGuard roles={['ADMIN']}>
            <CreateDomainPage/>
          </RoleGuard>
        } />
        <Route path="/domains/view/:id" element={
            <DomainViewPage/>
        } />
        <Route path="/domains/edit/:id" element={
          <RoleGuard roles={['ADMIN']}>
            <EditDomainPage/>
          </RoleGuard>
        } />
        <Route path="/dns-records" element={
            <DNSRecordsPage/>
        } />
        <Route path="/ssl-certificates" element={
          <RoleGuard roles={['ADMIN', 'MANAGER']}>
            <SSLCertificatesPage/>
          </RoleGuard>
        } />
        <Route path="/ssl-certificates/create" element={
          <RoleGuard roles={['ADMIN']}>
            <CreateSSLCertificatePage/>
          </RoleGuard>
        } />
        <Route path="/ssl-certificates/:id" element={
          <RoleGuard roles={['ADMIN', 'MANAGER']}>
            <SSLCertificateViewPage/>
          </RoleGuard>
        } />
        <Route path="/ssl-certificates/:id/edit" element={
          <RoleGuard roles={['ADMIN']}>
            <EditSSLCertificatePage/>
          </RoleGuard>
        } />
        <Route path="/ssl-certificates/:id/timeline" element={
          <RoleGuard roles={['ADMIN','MANAGER']}>
            <SSLCertificateTimelinePage/>
          </RoleGuard>
        } />
        <Route path="/activity-logs" element={
          <RoleGuard roles={['ADMIN', 'MANAGER']}>
            <ActivityLogsPage/>
          </RoleGuard>
        } />
        <Route path="/dns-sync-logs" element={
          <RoleGuard roles={['ADMIN', 'MANAGER']}>
            <SyncLogsPage/>
          </RoleGuard>
        } />
        <Route path="/dns-change-logs" element={
          <RoleGuard roles={['ADMIN', 'MANAGER']}>
            <DNSChangeLogsPage/>
          </RoleGuard>
        } />
        <Route path="/notifications" element={
          <RoleGuard roles={['ADMIN']}>
            <NotificationList/>
          </RoleGuard>
        } />
        <Route path="/reports" element={
          <RoleGuard roles={['ADMIN']}>
            <ReportsList/>
          </RoleGuard>
        } />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
