import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPersonalWatchlist } from '../apis/watchlist'
import { deleteFromPersonalWatchlist } from '../apis/watchlist'
import { useUser } from '../context/UserContext'
import { useAuth0 } from '@auth0/auth0-react'
import { getMovieDetails } from '../apis/movie'

const WatchList = () => {
  // const userId = 1 // use this for testing then will implement auth
  const { userId, isLoading: userLoading } = useUser()
  const { user, isAuthenticated } = useAuth0()
  const queryClient = useQueryClient()

  const {
    data: watchlist = [],
    error,
    isLoading: queryLoading,
  } = useQuery({
    queryKey: ['watchlist', userId],
    queryFn: () => getPersonalWatchlist(userId!),
    enabled: !!userId,
  })

  const removeMutation = useMutation({
    mutationFn: ({ userId, movieId }: { userId: number; movieId: number }) =>
      deleteFromPersonalWatchlist(userId, movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', userId] })
    },
  })

  if (queryLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h2 className="text-3xl font-bold mb-4">Please Log In</h2>
        <p>You need to log in to see your watchlist</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="alert alert-error">Error Loading Watchlist</div>
      </div>
    )
  }

  if (watchlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-base-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Your Watchlist</h2>
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
          <h2 className="text-3xl font-bold">Your Watchlist</h2>
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
                  <button
                    onClick={() =>
                      removeMutation.mutate({
                        userId: userId!,
                        movieId: movie.tmdb_id,
                      })
                    }
                    className="btn btn-sm btn-error btn-outline"
                    disabled={removeMutation.isPending}
                  >
                    delete
                  </button>
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

export default WatchList
