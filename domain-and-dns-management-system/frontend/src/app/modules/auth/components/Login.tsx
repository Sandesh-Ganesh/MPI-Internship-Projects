import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {login} from '../core/_requests'
import {useAuth} from '../core/Auth'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),

  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)

  const {saveAuth, setCurrentUser} = useAuth()

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,

    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)

      try {
        const response = await login(values.email, values.password)

        const data = response.data

        // Save token
        saveAuth({api_token: data.token})

        // Save user
        setCurrentUser(data.user)

        // Redirect
        navigate('/dashboard')
      } catch (error) {
        console.error(error)

        saveAuth(undefined)

        setStatus('Invalid email or password')

        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-gray-900 fw-bolder mb-3'>
          DNS Management System
        </h1>

        <div className='text-gray-500 fw-semibold fs-6'>
          Sign in to continue
        </div>
      </div> 

      {/* Error Alert */}
      {formik.status && (
        <div className='mb-lg-10 alert alert-danger'>
          <div className='alert-text fw-bold'>{formik.status}</div>
        </div>
      )}

      {/* Email */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-gray-900'>
          Email
        </label>

        <input
          placeholder='Enter your email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.email && formik.errors.email,
            },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />

        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>

      {/* Password */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-gray-900 fs-6 mb-0'>
          Password
        </label>

        <input
          type='password'
          autoComplete='off'
          placeholder='Enter your password'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid':
                formik.touched.password && formik.errors.password,
            },
            {
              'is-valid':
                formik.touched.password && !formik.errors.password,
            }
          )}
        />

        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>

      {/* Forgot Password */}
      {/* <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        <Link to='/auth/forgot-password' className='link-primary'>
          Forgot Password?
        </Link>
      </div> */}

      {/* Submit */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && (
            <span className='indicator-label'>Sign In</span>
          )}

          {loading && (
            <span
              className='indicator-progress'
              style={{display: 'block'}}
            >
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Don’t have an account?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up
        </Link>
      </div>
    </form>
  )
}