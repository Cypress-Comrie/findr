import { Outlet, Link, useLocation } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

function App() {
  const location = useLocation()
  const { isAuthenticated } = useAuth0()

  return (
    <div className="app">
      <header className="p-4 bg-purple-600 text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Findr</h1>
          <nav className="flex gap-4 items-center">
            {isAuthenticated && (
              <>
                <Link
                  to="/cards"
                  className={`px-4 py-2 rounded ${
                    location.pathname === '/cards'
                      ? 'bg-purple-700 underline'
                      : 'hover:bg-purple-500'
                  }`}
                >
                  Discover
                </Link>
                <Link
                  to="/watchlist"
                  className={`px-4 py-2 rounded ${
                    location.pathname === '/watchlist'
                      ? 'bg-purple-700 underline'
                      : 'hover:bg-purple-500'
                  }`}
                >
                  Watchlist
                </Link>
                <Link
                  to="/sharedwatchlist"
                  className={`px-4 py-2 rounded ${
                    location.pathname === '/sharedwatchlist'
                      ? 'bg-purple-700 underline'
                      : 'hover:bg-purple-500'
                  }`}
                >
                  Shared Watchlist
                </Link>
              </>
            )}
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </nav>
        </div>
      </header>
      <main>
        <Outlet /> {/* This renders your child routes */}
      </main>
    </div>
  )
}

export default App
