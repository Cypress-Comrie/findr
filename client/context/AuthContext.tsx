import { Auth0Provider } from '@auth0/auth0-react'
import { ReactNode } from 'react'

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  const callbackUrl = import.meta.env.VITE_AUTH0_CALLBACK_URL

  if (!domain || !clientId || !callbackUrl) {
    console.error('Auth0 environment variables are not set')
    return <>{children}</>
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: callbackUrl,
      }}
    >
      {children}
    </Auth0Provider>
  )
}
