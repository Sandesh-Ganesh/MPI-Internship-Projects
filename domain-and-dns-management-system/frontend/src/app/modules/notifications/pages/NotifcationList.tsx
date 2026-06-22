import {useEffect, useState} from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import {
  getNotificationsPaginated,
  markNotificationRead,
} from '../api/notificationService'

import {Notification} from '../types/notificationTypes'
import {useNotifications} from '../../../../app/modules/notifications/context/NotificationContext'

dayjs.extend(relativeTime)

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [page, setPage] = useState(1)

  const [totalPages, setTotalPages] = useState(1)

  const [source, setSource] = useState('')
  const [type, setType] = useState('')
  const { refreshNotifications } = useNotifications()

  const fetchNotifications = async () => {
    try {
      const data = await getNotificationsPaginated(
        page,
        20,
        source,
        type
      )

      setNotifications(data.notifications)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [page, source, type])

  const handleRead = async (id: number) => {
    try {
      await markNotificationRead(id)
      await fetchNotifications()
      await refreshNotifications()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='card'>
      <div className='card-header border-0 pt-6'>
        <div className='card-title'>
          <h2>Notifications</h2>
        </div>

        <div className='card-toolbar gap-3'>
          <select
            className='form-select form-select-sm'
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value=''>All Sources</option>
            <option value='DNS_SYNC'>DNS Sync</option>
            <option value='DOMAIN_STATUS'>
              Domain Status
            </option>
            <option value='SSL_STATUS'>
              SSL Status
            </option>
          </select>

          <select
            className='form-select form-select-sm'
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value=''>All Types</option>
            <option value='success'>Success</option>
            <option value='warning'>Warning</option>
            <option value='error'>Error</option>
            <option value='info'>Info</option>
          </select>
        </div>
      </div>

      <div className='card-body py-4'>
        <table className='table align-middle table-row-dashed fs-6 gy-5'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Source</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.notification_id}>
                <td>
                  <div className='fw-bold'>
                    {notification.title}
                  </div>

                  <div className='text-muted fs-7'>
                    {notification.message}
                  </div>
                </td>

                <td>
                  <span className='badge badge-light-info'>
                    {notification.source}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge badge-light-${
                      notification.type === 'success'
                        ? 'success'
                        : notification.type === 'warning'
                        ? 'warning'
                        : notification.type === 'error'
                        ? 'danger'
                        : 'primary'
                    }`}
                  >
                    {notification.type}
                  </span>
                </td>

                <td>
                  {notification.is_read ? (
                    <span className='badge badge-light-success'>
                      Read
                    </span>
                  ) : (
                    <span className='badge badge-light-warning'>
                      Unread
                    </span>
                  )}
                </td>

                <td>
                  {dayjs(
                    notification.createdAt
                  ).fromNow()}
                </td>

                <td>
                  {!notification.is_read && (
                    <button
                      className='btn btn-sm btn-light-primary'
                      onClick={() =>
                        handleRead(
                          notification.notification_id
                        )
                      }
                    >
                      Mark Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='d-flex justify-content-end gap-2 mt-5'>
          <button
            className='btn btn-sm btn-light'
            disabled={page === 1}
            onClick={() =>
              setPage((prev) => prev - 1)
            }
          >
            Previous
          </button>

          <span className='align-self-center'>
            Page {page} of {totalPages}
          </span>

          <button
            className='btn btn-sm btn-light'
            disabled={page >= totalPages}
            onClick={() =>
              setPage((prev) => prev + 1)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotificationList