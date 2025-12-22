import { getPopularMovies } from '../apis/movie'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import TinderCard from 'react-tinder-card'
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
  // lets us know which way we swapped and what we want to do with that
  const onSwipe = (direction: string, movie: any) => {
    console.log(`You swiped ${direction} on ${movie}`)

    if (direction == 'right') {
      console.log('Added to watchlist:', movie.title)
    }

    if (direction == 'left') {
      console.log('you passed on:', movie.title)
    }
  }

  // lets us know its seen the movie leave and changed to the next
  const onCardLeftScreen = (movie: any) => {
    console.log(`${movie.title} left the screen`)
    setCurrentIndex((prev) => prev + 1)
  }

  if (isLoading) {
    return 'loading...'
  }

  if (error) {
    return 'Error Loading'
  }
  // Using figure instead of a div tag -- learnt figure is better for stand alone content perfect for the posters
  if (currentIndex >= movies.length) {
    return (
      <div className="flex flec-col items-center justify-center min-h-screen gap-4">
        <h2 className="text-3xl font-bold">No more movies! 🎬</h2>
        <button
          className="btn btn-primary gap-2"
          onClick={() => setCurrentIndex(0)}
        >
          Start Over
        </button>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center justify-content min-h-screen p-6 bg-base-200">
      {/* Stacked Cards Container */}
      <div className="stack w-full max-w-sm md:max-w-lg lg:max-w-2xl"></div>
      {movies.slice(0, 3).map((movie, index) => (
        <div
          key={movie.tmdb_id}
          className="card bg-base-100 shadow-xl"
          style={{
            transform: `translateY(${index * -100}px)`,
          }}
        >
          <figure className="h-96">
            {/* Movie Poster */}
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
          </figure>

          {/* Movie Title */}
          <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            {/* Movie Description */}
            <p className="text-sm line-clamp-3 ">
              {movie.description || 'No description available.'}
            </p>
            {/* Movie Release/Rating */}
            <div className="text-sm opacity-70 space-y-1">
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
