import { getPopularMovies } from '../apis/movie'
import { useQuery } from '@tanstack/react-query'
import { useState, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import { Flag, HeartCrack, Heart } from 'lucide-react'
import { useWatchlist } from '../context/WatchlistContext'
// TODO check if parnters swiped yes on same
const MovieCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardRef = useRef<any>(null)
  const { addToWatchlist } = useWatchlist()

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
    console.log(`You swiped ${direction} on ${movie.title}`)

    if (direction == 'right') {
      console.log('Added to watchlist:', movie.title)
      addToWatchlist(movie)
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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-base-200">
      {/* Card Stack Container */}
      <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-[600px] mb-8">
        {/* Only render the current swipeable card - no background cards */}
        {currentIndex < movies.length && (
          <TinderCard
            ref={cardRef}
            key={movies[currentIndex].tmdb_id}
            onSwipe={(dir) => onSwipe(dir, movies[currentIndex])}
            onCardLeftScreen={() => onCardLeftScreen(movies[currentIndex])}
            preventSwipe={['up', 'down']}
            className="absolute w-full h-full"
            swipeRequirementType="position"
            swipeThreshold={100}
          >
            <div className="card bg-base-100 shadow-2xl h-full">
              <figure className="h-[450px]">
                <img
                  src={movies[currentIndex].poster_url}
                  alt={movies[currentIndex].title}
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-xl">
                  {movies[currentIndex].title}
                </h2>
                <p className="text-sm line-clamp-2">
                  {movies[currentIndex].description ||
                    'No description available.'}
                </p>
                <div className="flex gap-3 text-sm mt-2">
                  <span className="badge badge-ghost">
                    {movies[currentIndex].release_year}
                  </span>
                  <span>
                    ⭐{' '}
                    {movies[currentIndex].rating
                      ? movies[currentIndex].rating.toFixed(1)
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </TinderCard>
        )}
      </div>

      {/* Swipe Instructions & Counter */}
      <div className="text-center mb-4">
        <p className="text-sm opacity-70">Swipe right to like, left to pass</p>
        <div className="text-sm font-semibold mt-2">
          {currentIndex + 1} / {movies.length}
        </div>
      </div>

      {/* Swipe Buttons */}
      <div className="flex gap-8">
        <button
          onClick={() => {
            if (cardRef.current) {
              cardRef.current.swipe('left')
            }
          }}
          className="btn btn-circle btn-lg btn-error shadow-xl hover:scale-110 transition-transform"
        >
          <HeartCrack size={32} strokeWidth={3} />
        </button>

        <button
          onClick={() => {
            if (cardRef.current) {
              cardRef.current.swipe('right')
            }
          }}
          className="btn btn-circle btn-lg btn-success shadow-xl hover:scale-110 transition-transform"
        >
          <Heart size={32} strokeWidth={3} />
        </button>
      </div>
    </div>
  )
}

export default MovieCards
