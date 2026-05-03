import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useAuth} from '../../../../../app/modules/auth'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const {currentUser} = useAuth()
  return (
    <>
  {/* Dashboard */}
  <SidebarMenuItem to='/dashboard' title='Dashboard' icon='element-11' />

  {/* Masters */}
  {currentUser?.role === 'ADMIN' && ( 
  <SidebarMenuItemWithSub to='#' title='Masters' icon='abstract-26'>
    <SidebarMenuItem to='/companies' title='Companies' hasBullet />
    <SidebarMenuItem to='/vendors' title='Vendors' hasBullet />
    <SidebarMenuItem to='/control-panels' title='Control Panels' hasBullet />
    <SidebarMenuItem to='/cost-centers' title='Cost Centers' hasBullet />
  </SidebarMenuItemWithSub>
  )}
  {/* Transactions */}
  { (currentUser?.role === 'ADMIN' || currentUser?.role === 'MANAGER' ) && (
  <SidebarMenuItemWithSub to='#' title='Transactions' icon='element-12'>
    <SidebarMenuItem to='/domains' title='Domains' hasBullet />
    <SidebarMenuItem to='/dns-records' title='DNS Records' hasBullet />
    <SidebarMenuItem to='/ssl-certificates' title='SSL Certificates' hasBullet />
  </SidebarMenuItemWithSub>
  )}
  {/* For User */}
  {currentUser?.role === 'USER' && (
    <>
    <SidebarMenuItem to='/domains' title='Domains' icon="domain"  hasBullet={false} />
    <SidebarMenuItem to='/dns-records' title='DNS Records' hasBullet={false} />
    </>
  )}
  {/* Logs */}
  { (currentUser?.role === 'ADMIN' || currentUser?.role === 'MANAGER' ) && (
  <SidebarMenuItemWithSub to='#' title='Logs' icon='document'>
    <SidebarMenuItem to='/activity-logs' title='Activity Logs' hasBullet />
    <SidebarMenuItem to='/dns-sync-logs' title='DNS Sync Logs' hasBullet />
    <SidebarMenuItem to='/dns-change-logs' title='DNS Change Logs' hasBullet />
  </SidebarMenuItemWithSub>
  )}
  {/* Admin */}
  {currentUser?.role === 'ADMIN' && (
  <SidebarMenuItemWithSub to='#' title='Admin' icon='profile-circle'>
    <SidebarMenuItem to='/users' title='Users' hasBullet />
  </SidebarMenuItemWithSub>
  )}
</>
  )
}

export {SidebarMenuMain}
