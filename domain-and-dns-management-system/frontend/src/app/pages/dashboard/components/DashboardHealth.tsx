import {FC} from 'react'

type Props = {
  alerts: any
  summary: any
}

const DashboardHealth: FC<Props> = ({alerts, summary}) => {
  const cards = [
    {
      title: 'Expiring Domains',
      value: alerts?.expiringDomains?.length || 0,
      color: 'warning',
      icon: 'ki-outline ki-global',
    },
    {
      title: 'Expiring SSL',
      value: summary?.expiringSSLs || 0,
      color: 'primary',
      icon: 'ki-outline ki-shield-tick',
    },
    {
      title: 'Expired SSL',
      value: summary?.expiredSSLs || 0,
      color: 'danger',
      icon: 'ki-outline ki-shield-cross',
    },
  ]

  return (
    <div className='row g-5 mb-8'>
      {cards.map((card) => (
        <div className='col-md-4' key={card.title}>
          <div className='card card-xl-stretch'>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <div className='text-gray-600 fw-semibold mb-2'>
                    {card.title}
                  </div>

                  <div className={`fs-1 fw-bold text-${card.color}`}>
                    {card.value}
                  </div>
                </div>

                <i
                  className={`${card.icon} fs-2hx text-${card.color}`}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardHealth