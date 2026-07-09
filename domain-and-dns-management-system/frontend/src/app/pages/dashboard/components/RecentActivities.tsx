import {FC} from 'react'

type Props = {
  activities: any[]
}

const RecentActivities: FC<Props> = ({activities}) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='card-title'>Recent Activities</h3>
      </div>

      <div className='card-body'>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className='d-flex align-items-center mb-6'
            >
              <div className='symbol symbol-40px me-4'>
                <div className='symbol-label bg-light-primary'>
                  <i className='ki-outline ki-notification-status text-primary' />
                </div>
              </div>

              <div className='flex-grow-1'>
                <div className='fw-bold'>
                  {activity.action}
                </div>

                <div className='text-muted fs-7'>
                  {new Date(
                    activity.createdAt
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
  )
}

export default RecentActivities