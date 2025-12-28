import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import request from 'superagent'

const rootURL = 'http://localhost:3000/api/v1'

interface UserContextType {
  userId: number | null
  isLoading: boolean
}

const UserContext = createContext<UserContextType>({
  userId: null,
  isLoading: true,
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading: auth0Loading } = useAuth0()
  const [userId, setUserId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  console.log('AUTH0 STATE', {
    auth0Loading,
    isAuthenticated,
    user,
  })

  useEffect(() => {
    if (auth0Loading) return

    // Not logged in
    if (!isAuthenticated) {
      setUserId(null)
      setIsLoading(false)
      return
    }

    // Logged in but user profile not ready yet
    if (!user) return

    async function fetchUserId() {
      try {
        console.log('Fetching user ID for:', user.sub)

        const res = await request.post(`${rootURL}/users/auth0`).send({
          auth0_id: user.sub,
          email: user.email,
          name: user.name,
        })

        setUserId(res.body.id)
      } catch (error) {
        console.error('Failed to fetch user:', error)
        setUserId(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserId()
  }, [auth0Loading, isAuthenticated, user])

  return (
    <UserContext.Provider value={{ userId, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
