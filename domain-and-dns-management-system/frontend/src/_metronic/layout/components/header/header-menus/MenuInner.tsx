import {useIntl} from 'react-intl'
import {MenuItem} from './MenuItem'

export function MenuInner() {
  const intl = useIntl()

  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      <MenuItem title='Domains' to='/domains' />
      <MenuItem title='DNS Records' to='/dns-records' />
      <MenuItem title='SSL Certificates' to='/ssl-certificates' />
    </>
  )
}
