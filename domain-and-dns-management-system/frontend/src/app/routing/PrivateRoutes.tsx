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

const PrivateRoutes = () => {
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='/companies' element={<CompaniesPage />} />
        <Route path="/companies/create" element={<CreateCompanyPage />} />
        <Route path="/companies/view/:id" element={<ViewCompanyPage />} />
        <Route path="/companies/edit/:id" element={<EditCompanyPage />} />
        <Route path="/cost-centers" element={<CostCentersPage />} />
        <Route path="/cost-centers/create" element={<CreateCostCenterPage />} />
        <Route path="/cost-centers/edit/:id" element={<EditCostCenterPage />} />
        <Route path="/cost-centers/view/:id" element={<ViewCostCenterPage />} />
        <Route path='/control-panels' element={<ControlPanelsPage />} />
        <Route path="/control-panels/create" element={<CreateControlPanelPage />} />
        <Route path="/control-panels/edit/:id" element={<EditControlPanelPage />} />
        <Route path="/control-panels/view/:id" element={<ViewControlPanelPage />} />
        <Route path="/vendors" element={<VendorsPage />} />
        <Route path="/vendors/create" element={<CreateVendorPage />} />
        <Route path="/vendors/view/:id" element={<ViewVendorPage />} />
        <Route path="/vendors/edit/:id" element={<EditVendorPage />} />
        <Route path='/domains' element={<DomainsPage />} />
        <Route path="/domains/create" element={<CreateDomainPage />} />
        <Route path="/domains/view/:id" element={<DomainViewPage />} />
        <Route path="/domains/edit/:id" element={<EditDomainPage />} />
        <Route path="/dns-records" element={<DNSRecordsPage />} />
        <Route path="/ssl-certificates" element={<SSLCertificatesPage />} />
        <Route path="/ssl-certificates/create" element={<CreateSSLCertificatePage />} />
        <Route path="/ssl-certificates/:id" element={<SSLCertificateViewPage />}/>
        <Route path="/ssl-certificates/:id/edit" element={<EditSSLCertificatePage />} />
        <Route path="/ssl-certificates/:id/timeline" element={<SSLCertificateTimelinePage />}/>
        <Route path="/activity-logs" element={<ActivityLogsPage />} />
        <Route path="/dns-sync-logs" element={<SyncLogsPage />} />
        <Route path="/dns-change-logs" element={<DNSChangeLogsPage />} />
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
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
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
