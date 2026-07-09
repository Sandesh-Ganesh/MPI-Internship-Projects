import {FC} from 'react'

type Props = {
  userName: string
  role: string
}

const DashboardBanner: FC<Props> = ({userName, role}) => {
  return (
    <div className='card mb-8'>
      <div className='card-body py-10 px-10'>
        <div className='d-flex flex-stack flex-wrap'>
          <div>
            <div className='text-gray-600 fw-semibold mb-2'>
              DNS Management System
            </div>

            <h1 className='fw-bold mb-2'>
              Welcome back, {userName}
            </h1>

            <div className='text-muted'>
              Role: {role}
            </div>
          </div>

          <div className='text-end'>
            <div className='badge badge-light-success fs-7'>
              System Operational
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardBanner