import {FC} from 'react'

type Props = {
  title: string
  items: any[]
}

const ExpiryTable: FC<Props> = ({
  title,
  items,
}) => {
  return (
    <div className='card h-100'>
      <div className='card-header'>
        <h3 className='card-title fw-bold'>
          {title}
        </h3>
      </div>

      <div className='card-body'>
        {items?.length > 0 ? (
          <div className='table-responsive'>
            <table className='table align-middle'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item?.domain_name ||
                        item?.common_name ||
                        '-'}
                    </td>

                    <td>
                      {item?.expiry_date
                        ? new Date(
                            item.expiry_date
                          ).toLocaleDateString()
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='text-center py-10 text-muted'>
            No records expiring within 30 days
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpiryTable