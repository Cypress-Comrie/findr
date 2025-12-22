import { useAuth0 } from '@auth0/auth0-react'
import { LogIn } from 'lucide-react'

const LoginButton = () => {
  const { loginWithRedirect, isLoading } = useAuth0()

  return (
    <button
      onClick={() => loginWithRedirect()}
      disabled={isLoading}
      className="btn btn-primary gap-2"
    >
      <LogIn size={18} />
      {isLoading ? 'Loading...' : 'Log In'}
    </button>
  )
}

export default LoginButton
