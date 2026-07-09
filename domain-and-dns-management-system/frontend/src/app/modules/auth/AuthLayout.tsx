import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')

    if (root) {
      root.style.height = '100%'
    }

    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
      {/* Left Side */}
      <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 bg-body'>
        {/* Form */}
        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          <div className='w-lg-500px p-10'>
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <div className='text-center text-gray-500 fs-7 fw-semibold py-5'>
          © {new Date().getFullYear()} DNS and Domain Management System
        </div>
      </div>

      {/* Right Side */}
      <div
        className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2'
        style={{
          backgroundImage: `url(${toAbsoluteUrl('media/misc/auth-bg.png')})`,
        }}
      >
        <div className='d-flex flex-column flex-center py-15 px-5 px-md-15 w-100'>
          {/* Title */}
          <div className='text-center mb-10'>
            <h1 className='text-white fs-2hx fw-bolder mb-5'>
              DNS and Domain Management System
            </h1>

            <div className='text-white opacity-75 fs-4'>
              Centralized platform for managing domains,
              DNS records, SSL certificates, vendors,
              control panels, and infrastructure operations.
            </div>
          </div>

          {/* Illustration */}
          <img
            className='mx-auto w-275px w-md-50 w-xl-500px'
            src={toAbsoluteUrl('media/misc/dns-dashboard.png')}
            alt='DNS Management System'
          />
        </div>
      </div>
    </div>
  )
}

export {AuthLayout}