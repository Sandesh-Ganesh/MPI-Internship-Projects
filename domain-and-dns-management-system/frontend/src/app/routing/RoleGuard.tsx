import {Navigate} from 'react-router-dom'
import {useAuth} from '../modules/auth'

interface Props {
  roles: string[]
  children: React.ReactNode
}

const RoleGuard = ({roles, children}: Props) => {
  const {currentUser} = useAuth()

  if (!currentUser) {
    return <Navigate to='/auth/login' replace />
  }

  if (!roles.includes(currentUser.role)) {
    return <Navigate to='/error' replace />
  }

  return <>{children}</>
}

export default RoleGuard