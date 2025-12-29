import { useQuery } from '@tanstack/react-query'
import { getSharedWatchlist } from '../apis/watchlist'
import { useAuth0 } from '@auth0/auth0-react'
import { useUser } from '../context/UserContext'
import request from 'superagent'

const rootURL = 'http://localhost:3000/api/v1'

// very similar to how the personal watchlist works except grabs relationship id
const SharedWatchlist = () => {
  const { userId, isLoading: userLoading } = useUser()
  const { user, isAuthenticated } = useAuth0()

  // First, fetch the user's relationships
  const {
    data: relationships = [],
    error: relationshipsError,
    isLoading: relationshipsLoading,
  } = useQuery({
    queryKey: ['relationships', userId],
    queryFn: async () => {
      if (!userId) return []
      try {
        const res = await request.get(`${rootURL}/relationships/${userId}`)
        return res.body
      } catch (error) {
        console.error('Failed to fetch relationships:', error)
        throw error
      }
    },
    enabled: !!userId,
  })

  const relationshipId = relationships.length > 0 ? relationships[0].id : null

  const { data: watchlist = [], error } = useQuery({
    queryKey: ['watchlist', relationshipId],
    queryFn: () => getSharedWatchlist(relationshipId!),
    enabled: !!relationshipId,
  })

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h2 className="text-3xl font-bold mb-4">Error Loading Watchlist</h2>
        <p className="text-lg opacity-70 mb-4">
          {error instanceof Error ? error.message : 'An error occurred'}
        </p>
        <p className="text-sm">Please try refreshing the page.</p>
      </div>
    )
  }

  if (userLoading || relationshipsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (relationshipsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h2 className="text-3xl font-bold mb-4">Error Loading Relationships</h2>
        <p className="text-lg opacity-70 mb-4">
          {relationshipsError instanceof Error
            ? relationshipsError.message
            : 'An error occurred'}
        </p>
        <p className="text-sm">Please try refreshing the page.</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h2 className="text-3xl font-bold mb-4">Please Log In</h2>
        <p>You need to log in to see your shared watchlist</p>
      </div>
    )
  }

  if (relationships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-base-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">No Relationships Yet</h2>
          <p className="text-lg opacity-70">
            You need to add a partner to view a shared watchlist.
          </p>
        </div>
      </div>
    )
  }

  if (watchlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-base-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Watchlist</h2>
          <p className="text-lg opacity-70">
            No movies yet! Swipe right on some movies to add them to your
            watchlist.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          {isAuthenticated && <p>Hello {user?.name}</p>}
          <h2 className="text-3xl font-bold">Our Watchlist</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((movie) => (
            <div
              key={movie.tmdb_id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <figure className="h-64">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg line-clamp-2">
                  {movie.title}
                </h3>
                <p className="text-sm opacity-70 line-clamp-3">
                  {movie.description || 'No description available.'}
                </p>
                <div className="flex gap-2 text-sm mt-2">
                  {movie.release_year && (
                    <span className="badge badge-ghost">
                      {movie.release_year}
                    </span>
                  )}
                  {movie.rating && (
                    <span className="badge badge-ghost">
                      ⭐ {movie.rating.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm opacity-70">
            Total movies in watchlist: {watchlist.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SharedWatchlist
