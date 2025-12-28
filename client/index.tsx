import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { UserProvider } from './context/UserContext'
import routes from './routes.tsx'

const queryClient = new QueryClient()
const router = createBrowserRouter(routes)

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
      cacheLocation="localstorage" // persist login across refresh
      useRefreshTokens // refresh tokens automatically
    >
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserProvider>
    </Auth0Provider>,
  )
})
