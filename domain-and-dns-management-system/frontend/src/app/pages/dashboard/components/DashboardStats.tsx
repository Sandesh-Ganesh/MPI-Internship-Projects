import {FC} from 'react'

type Props = {
  stats: any[]
  loading: boolean
}

const DashboardStats: FC<Props> = ({stats, loading}) => {
  return (
    <div className='row g-5 g-xl-8 mb-8'>
      {stats.map((stat) => (
        <div className='col-xl-3 col-md-6' key={stat.title}>
          <div className='card card-xl-stretch'>
            <div className='card-body d-flex align-items-center'>
              <div
                className={`symbol symbol-60px me-5 bg-light-${stat.color}`}
              >
                <span className={`symbol-label text-${stat.color}`}>
                  <i className={`${stat.icon} fs-1`} />
                </span>
              </div>

              <div className='flex-grow-1'>
                {loading ? (
                  <div className='placeholder placeholder-glow w-100 h-25px rounded'></div>
                ) : (
                  <div className='fw-bold fs-2x'>{stat.value}</div>
                )}

                <div className='text-gray-600 fw-semibold'>
                  {stat.title}
                </div>

                <div
                  className={`text-${stat.color} fs-7 fw-bold mt-1`}
                >
                  {stat.change}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats