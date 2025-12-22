import { getPopularMovies } from '../apis/movie'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import TinderCard from 'react-tinder-card'
import { Flag, HeartCrack, Heart } from 'lucide-react'
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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-base-200">
      {/* Card Stack Container */}
      <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-[600px] mb-8">
        {movies.slice(currentIndex, currentIndex + 3).map((movie, index) => (
          <TinderCard
            key={movie.tmdb_id}
            onSwipe={(dir) => onSwipe(dir, movie)}
            onCardLeftScreen={() => onCardLeftScreen(movie)}
            preventSwipe={['up', 'down']}
            className="absolute w-full h-full"
            swipeRequirementType="position"
            swipeThreshold={100}
          >
            <div
              className="card bg-base-100 shadow-2xl h-full"
              style={{
                transform: `translateY(${index * 10}px) scale(${1 - index * 0.03})`,
                opacity: index === 0 ? 1 : 0.5,
                pointerEvents: index === 0 ? 'auto' : 'none',
              }}
            >
              <figure className="h-[450px]">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-xl">{movie.title}</h2>
                <p className="text-sm line-clamp-2">
                  {movie.description || 'No description available.'}
                </p>
                <div className="flex gap-3 text-sm mt-2">
                  <span className="badge badge-ghost">
                    {movie.release_year}
                  </span>
                  <span>
                    ⭐ {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      {/* Swipe Instructions & Counter */}
      <div className="text-center mb-4">
        <p className="text-sm opacity-70">Swipe right to like, left to pass</p>
        <div className="text-sm font-semibold mt-2">
          {currentIndex + 1} / {movies.length}
        </div>
      </div>

      {/* Swipe Buttons (for desktop users) */}
      <div className="flex gap-8">
        <button
          onClick={() => {
            // You can trigger programmatic swipes if needed
            console.log('Pass clicked')
          }}
          className="btn btn-circle btn-lg btn-error shadow-xl hover:scale-110 transition-transform"
        >
          <HeartCrack size={32} strokeWidth={3} />
        </button>

        <button
          onClick={() => {
            // You can trigger programmatic swipes if needed
            console.log('Like clicked')
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
