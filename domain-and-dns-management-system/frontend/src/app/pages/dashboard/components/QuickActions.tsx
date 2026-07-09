import {FC} from 'react'
import {useNavigate} from 'react-router-dom'

type Props = {
  role: string
}

const QuickActions: FC<Props> = ({role}) => {
  const navigate = useNavigate()

  const actions = [
    {
      title: 'Domains',
      path: '/domains',
      roles: ['ADMIN', 'MANAGER'],
      icon: 'ki-outline ki-global',
    },
    {
      title: 'SSL',
      path: '/ssl-certificates',
      roles: ['ADMIN', 'MANAGER'],
      icon: 'ki-outline ki-shield-tick',
    },
    {
      title: 'Users',
      path: '/users',
      roles: ['ADMIN'],
      icon: 'ki-outline ki-profile-circle',
    },
    {
      title: 'Reports',
      path: '/reports',
      roles: ['ADMIN', 'MANAGER'],
      icon: 'ki-outline ki-document',
    },
  ]

  return (
    <div className='card mb-8'>
      <div className='card-header'>
        <h3 className='card-title'>Quick Actions</h3>
      </div>

      <div className='card-body'>
        <div className='row g-5'>
          {actions
            .filter((a) => a.roles.includes(role))
            .map((action) => (
              <div className='col-md-3' key={action.title}>
                <div
                  className='border rounded p-5 text-center cursor-pointer hover-elevate-up'
                  onClick={() => navigate(action.path)}
                >
                  <i
                    className={`${action.icon} fs-2hx text-primary mb-3`}
                  />

                  <div className='fw-bold'>{action.title}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default QuickActions