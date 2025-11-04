import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import useAuth from '@/hooks/useAuth'
import LoadingSpinner from '@/components/ui/Shared/LoadingSpinner'
import { saveUserInDb } from '@/api/utils'

const demoCredentials = {
  participant: { email: 'demo@participant.com', password: '123456' },
  organizer: { email: 'demo@organizer.com', password: '123456' },
  admin: { email: 'demo@admin.com', password: '123456' },
}

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from?.pathname || '/'

  if (user) return <Navigate to={from} replace={true} />
  if (loading) return <LoadingSpinner />

  // form submit handler
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value

    try {
      const result = await signIn(email, password)
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      }
      await saveUserInDb(userData)
      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle()
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      }
      await saveUserInDb(userData)
      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-lime-50 to-lime-200 px-4'>
      <div className='flex flex-col max-w-md p-6 rounded-lg sm:p-10 bg-white shadow-lg'>
        <div className='mb-6 text-center'>
          <h1 className='text-3xl font-bold text-lime-700'>Welcome Back!</h1>
          <p className='text-gray-500 mt-1'>Sign in to access your account</p>
        </div>

        {/* Demo credentials */}
        <div className='bg-lime-100 border-l-4 border-lime-500 rounded p-3 mb-4 text-sm text-gray-700'>
          <p className='font-semibold mb-1'>💡 Demo Credentials</p>
          <ul className='space-y-1'>
            <li>Participant: demo@participant.com / 123456</li>
            <li>Organizer: demo@organizer.com / 123456</li>
            <li>Admin: demo@admin.com / 123456</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='email' className='block text-sm mb-1'>
              Email address
            </label>
            <input
              type='email'
              name='email'
              id='email'
              required
              placeholder='Enter your email'
              className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-50 text-gray-900'
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm mb-1'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              required
              placeholder='********'
              className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-50 text-gray-900'
            />
          </div>

          <button
            type='submit'
            className='w-full py-3 mt-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 transition'
          >
            {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Continue'}
          </button>
        </form>

        <div className='text-right mt-2'>
          <button className='text-xs text-gray-500 hover:text-lime-600 hover:underline'>
            Forgot password?
          </button>
        </div>

        <div className='flex items-center my-4 space-x-2'>
          <div className='flex-1 h-px bg-gray-300'></div>
          <p className='text-sm text-gray-500'>Or continue with</p>
          <div className='flex-1 h-px bg-gray-300'></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border border-gray-300 p-2 rounded cursor-pointer hover:bg-gray-100 transition'
        >
          <FcGoogle size={28} />
          <span>Continue with Google</span>
        </div>

        <p className='text-center text-sm text-gray-500 mt-4'>
          Don&apos;t have an account?{' '}
          <Link to='/signup' className='text-lime-600 hover:underline'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
