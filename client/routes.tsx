/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App'
import MovieCards from './components/MovieCards'
import WatchList from './components/WatchList'
import ProtectedRoute from './components/ProtectedRoute'
import SharedWatchlist from './components/SharedWatchList'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route
      path="cards"
      element={
        <ProtectedRoute>
          <MovieCards />
        </ProtectedRoute>
      }
    />
    <Route
      path="watchlist"
      element={
        <ProtectedRoute>
          <WatchList />
        </ProtectedRoute>
      }
    />
    <Route
      index
      element={
        <ProtectedRoute>
          <MovieCards />
        </ProtectedRoute>
      }
    />
    <Route
      path="shared-watchlist"
      element={
        <ProtectedRoute>
          <SharedWatchlist />
        </ProtectedRoute>
      }
    />
  </Route>,
)

export default routes
