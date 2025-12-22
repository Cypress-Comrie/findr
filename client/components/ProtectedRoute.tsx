import { useAuth0 } from '@auth0/auth0-react'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoading, isAuthenticated } = useAuth0()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h2 className="text-3xl font-bold">Access Denied</h2>
        <p className="text-lg opacity-70">Please log in to continue</p>
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
