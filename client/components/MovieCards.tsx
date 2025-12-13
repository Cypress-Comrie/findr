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
      console.log('🎬 Fetching movies...')
      const allMovies = await getPopularMovies()
      console.log('📦 Received movies:', allMovies)
      console.log('📊 Number of movies:', allMovies?.length)

      return allMovies.slice(0, 5)
    },
  })
  console.log('🎯 Current state:', {
    isLoading,
    error,
    movies,
    movieCount: movies?.length,
  })

  if (isLoading) {
    return 'loading...'
  }

  if (error) {
    return 'Error Loading'
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {movies.map((movie) => (
        <a
          href="#"
          key={movie.tmdb_id}
          className="flex flex-col items-center bg-white p-6 border border-gray-200 rounded-lg shadow-md md:flex-row md:max-w-xl hover:shadow-lg transition"
        >
          <img
            className="object-cover w-full rounded-lg h-64 md:h-auto md:w-48 mb-4 md:mb-0"
            src={movie.poster_url || '/placeholder-poster.jpg'}
            alt={movie.title}
          />

          <div className="flex flex-col justify-between md:p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {movie.title}
            </h5>

            <p className="mb-4 text-gray-700">
              {movie.description || 'No description available.'}
            </p>

            <div className="mb-4 text-sm text-gray-600">
              <p>Year: {movie.release_year || 'N/A'}</p>
              <p>Rating: ⭐ {movie.rating || 'N/A'}</p>
            </div>

            <div>
              <button
                type="button"
                className="inline-flex items-center w-auto text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5"
              >
                View Details
                <svg
                  className="w-4 h-4 ms-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

export default MovieCards
