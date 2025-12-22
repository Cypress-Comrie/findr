import { useWatchlist } from '../context/WatchlistContext'
import { Trash2 } from 'lucide-react'

const WatchList = () => {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist()

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
          <h2 className="text-3xl font-bold">Your Watchlist</h2>
          {watchlist.length > 0 && (
            <button
              onClick={clearWatchlist}
              className="btn btn-outline btn-error"
            >
              Clear Watchlist
            </button>
          )}
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
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => removeFromWatchlist(movie.tmdb_id)}
                    className="btn btn-sm btn-error btn-outline"
                  >
                    <Trash2 size={16} />
                    Remove
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
