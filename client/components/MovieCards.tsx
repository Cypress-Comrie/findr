import { getPopularMovies } from '../apis/movie'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import { HeartCrack, Heart } from 'lucide-react'
import request from 'superagent'
import { useAuth0 } from '@auth0/auth0-react'

const rootURL = new URL(`/api/v1`, document.baseURI)

const MovieCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardRef = useRef<any>(null)
  const queryClient = useQueryClient()
  const userId = 1 // TODO: Get from auth

  const {
    data: movies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const allMovies = await getPopularMovies()
      return allMovies.slice(0, 30)
    },
  })

  // Mutation to save swipe to database
  const swipeMutation = useMutation({
    mutationFn: async (swipeData: {
      user_id: number
      movie_id: number
      liked: boolean
    }) => {
      const res = await request.post(`${rootURL}/swipes`).send(swipeData)
      return res.body
    },
    onSuccess: (data) => {
      console.log('✅ Swipe saved:', data)
      // Invalidate watchlist to refetch
      queryClient.invalidateQueries({ queryKey: ['watchlist', userId] })

      if (data.isMatch) {
        console.log("🎉 IT'S A MATCH!")
        // TODO: Show match notification
      }
    },
    onError: (error) => {
      console.error('❌ Failed to save swipe:', error)
    },
  })

  const onSwipe = (direction: string, movie: any) => {
    console.log(`You swiped ${direction} on ${movie.title}`)

    // Save swipe to database
    swipeMutation.mutate({
      user_id: userId,
      movie_id: movie.tmdb_id,
      liked: direction === 'right',
    })
  }

  const onCardLeftScreen = (movie: any) => {
    console.log(`${movie.title} left the screen`)
    setCurrentIndex((prev) => prev + 1)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="alert alert-error">Error Loading Movies</div>
      </div>
    )
  }

  if (currentIndex >= movies.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
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
      <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-[600px] mb-8">
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

      <div className="text-center mb-4">
        <p className="text-sm opacity-70">Swipe right to like, left to pass</p>
        <div className="text-sm font-semibold mt-2">
          {currentIndex + 1} / {movies.length}
        </div>
      </div>

      <div className="flex gap-8">
        <button
          onClick={() => {
            if (cardRef.current) {
              cardRef.current.swipe('left')
            }
          }}
          className="btn btn-circle btn-lg btn-error shadow-xl hover:scale-110 transition-transform"
          disabled={swipeMutation.isPending}
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
          disabled={swipeMutation.isPending}
        >
          <Heart size={32} strokeWidth={3} />
        </button>
      </div>
    </div>
  )
}

export default MovieCards
