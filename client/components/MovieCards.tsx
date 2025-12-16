import { getPopularMovies } from '../apis/movie'
import { useQuery } from '@tanstack/react-query'

const MovieCards = () => {
  const {
    data: movies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      console.log(' Fetching movies...')
      const allMovies = await getPopularMovies()
      console.log(' Received movies:', allMovies)
      console.log(' Number of movies:', allMovies?.length)

      return allMovies.slice(0, 5)
    },
  })

  if (isLoading) {
    return 'loading...'
  }

  if (error) {
    return 'Error Loading'
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      {movies.map((movie) => (
        <div
          key={movie.tmdb_id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Movie Poster */}
            <img
              className="w-48 h-72 object-cover rounded-lg flex-shrink-0 mx-auto md:mx-0"
              src={movie.poster_url || '/placeholder-poster.jpg'}
              alt={movie.title}
            />

            {/* Movie Details */}
            <div className="flex-1 flex flex-col items-center text-center space-y-3">
              <h5 className="text-2xl font-bold text-gray-900 max-w-sm">
                {movie.title}
              </h5>

              <p className="text-sm leading-snug text-gray-700 max-w-xs px-4">
                {movie.description || 'No description available.'}
              </p>

              <div className="text-sm text-gray-600">
                <p>Year: {movie.release_year || 'N/A'}</p>
                <p>
                  Rating: ⭐ {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2.5"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieCards
