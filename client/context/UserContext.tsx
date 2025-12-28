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

  useEffect(() => {
    async function fetchUserId() {
      if (!isAuthenticated || !user) {
        setUserId(null)
        setIsLoading(false)
        return
      }

      try {
        console.log(' Fetching user ID for:', user.sub)
        const res = await request.post(`${rootURL}/users/auth0`).send({
          auth0_id: user.sub,
          email: user.email,
          name: user.name,
        })

        console.log(' User ID:', res.body.id)
        setUserId(res.body.id)
      } catch (error) {
        console.error(' Failed to fetch user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!auth0Loading) {
      fetchUserId()
    }
  }, [user, isAuthenticated, auth0Loading])

  return (
    <UserContext.Provider value={{ userId, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
