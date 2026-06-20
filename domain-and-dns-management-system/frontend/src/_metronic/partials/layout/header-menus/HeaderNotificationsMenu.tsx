import {FC, useEffect, useState} from 'react'
import clsx from 'clsx'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'

import {
  getNotifications,
  markAllNotificationsRead,
} from '../../../../app/modules/notifications/api/notificationService'

import {Notification} from '../../../../app/modules/notifications/types/notificationTypes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const HeaderNotificationsMenu: FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications()
      setNotifications(data)
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const getNotificationMeta = (notification: Notification) => {
    switch (notification.source) {
      case 'SSL_CRON':
        return {
          icon: 'shield-tick',
          state: 'warning',
        }

      case 'ZONE_SYNC':
        return {
          icon: 'abstract-26',
          state: 'success',
        }

      case 'DOMAIN_SYNC':
        return {
          icon: 'abstract-39',
          state: 'success',
        }

      case 'DNS_SYNC':
        return {
          icon: 'arrows-circle',
          state: 'primary',
        }

      default:
        return {
          icon: 'notification-status',
          state: notification.type === 'error'
            ? 'danger'
            : notification.type,
        }
    }
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px'
      data-kt-menu='true'
    >
      {/* Header */}
      <div
        className='d-flex flex-column bgi-no-repeat rounded-top'
        style={{
          backgroundImage: `url('${toAbsoluteUrl(
            'media/misc/menu-header-bg.jpg'
          )}')`,
        }}
>
        <h3 className='text-white fw-bold px-9 mt-8 mb-2'>
          Notifications
        </h3>

        <span className='text-white opacity-75 px-9 mb-6'>
          {unreadCount} unread
        </span>
      </div>

      {/* Body */}
      <div className='scroll-y mh-325px my-5 px-8'>
        {notifications.length === 0 ? (
          <div className='text-center text-muted py-10'>
            No notifications found
          </div>
        ) : (
          notifications.map((notification) => {
            const meta = getNotificationMeta(notification)

            return (
              <div
                key={notification.notification_id}
                className='d-flex flex-stack py-4'
              >
                <div className='d-flex align-items-center'>
                  <div className='symbol symbol-35px me-4'>
                    <span
                      className={clsx(
                        'symbol-label',
                        `bg-light-${meta.state}`
                      )}
                    >
                      <KTIcon
                        iconName={meta.icon}
                        className={`fs-2 text-${meta.state}`}
                      />
                    </span>
                  </div>

                  <div className='mb-0 me-2'>
                    <div className='fs-6 text-gray-800 fw-bolder'>
                      {notification.title}
                    </div>

                    <div className='text-gray-500 fs-7'>
                      {notification.message}
                    </div>
                  </div>
                  <span className='badge badge-light-warning fs-8'>
                    {notification.source}
                  </span>
                </div>

                <div className='text-end'>
                  {!notification.is_read && (
                    <span className='badge badge-light-primary fs-8 mb-1'>
                      New
                    </span>
                  )}

                  <div className='text-gray-500 fs-8'>
                    {dayjs(notification.createdAt).fromNow()}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Footer */}
      <div className='py-3 text-center border-top'>
        <button
          className='btn btn-sm btn-light-primary'
          onClick={async () => {
            try {
              await markAllNotificationsRead()
              fetchNotifications()
            } catch (error) {
              console.error(error)
            }
          }}
        >
          <KTIcon iconName='check' className='fs-5' />
          Mark All Read
        </button>
      </div>
    </div>
  )
}

export {HeaderNotificationsMenu}