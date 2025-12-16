import { getPopularMovies } from '../apis/movie'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
// TODO save to personal watch list if swiped yes
// TODO check if parnters swiped yes on same
const MovieCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

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

      return allMovies.slice(0, 30)
    },
  })

  if (isLoading) {
    return 'loading...'
  }

  if (error) {
    return 'Error Loading'
  }
  // Using figure instead of a div tag -- learnt figure is better for stand alone content perfect for the posters

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      {movies.map((movie) => (
        <div
          key={movie.tmdb_id}
          className="card lg:card-side bg-base-100 shadow-xl"
        >
          <figure className="relative w-full max-w-sm md:max-w-lg lg:max-w-2xl h-96">
            {/* Movie Poster */}
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
          </figure>

          {/* Movie Details */}
          <div className="card-body">
            <h5 className="card-title text-lg">{movie.title}</h5>

            <p className="text-sm ">
              {movie.description || 'No description available.'}
            </p>

            <div className="text-sm opacity-70">
              <p>Year: {movie.release_year || 'N/A'}</p>
              <p>Rating: ⭐ {movie.rating ? movie.rating.toFixed(1) : 'N/A'}</p>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">View</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieCards
