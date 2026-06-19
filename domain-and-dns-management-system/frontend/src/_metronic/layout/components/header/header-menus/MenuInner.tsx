import {useIntl} from 'react-intl'
import {MenuItem} from './MenuItem'
import {useAuth} from '../../../../../app/modules/auth'

export function MenuInner() {
  const intl = useIntl()
  const { currentUser } = useAuth()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      <MenuItem title='Domains' to='/domains' />
      <MenuItem title='DNS Records' to='/dns-records' />
      { currentUser?.role != 'USER' && <MenuItem title='SSL Certificates' to='/ssl-certificates' /> }
    </>
  )
}
