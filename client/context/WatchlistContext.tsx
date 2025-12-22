import { createContext, useContext, useState, ReactNode } from 'react'

interface Movie {
  tmdb_id: string
  title: string
  poster_url: string
  description?: string
  release_year?: number
  rating?: number
}

interface WatchlistContextType {
  watchlist: Movie[]
  addToWatchlist: (movie: Movie) => void
  removeFromWatchlist: (tmdbId: string) => void
  clearWatchlist: () => void
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined,
)

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([])

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      // Check if movie already exists
      const exists = prev.some((m) => m.tmdb_id === movie.tmdb_id)
      if (exists) return prev
      return [...prev, movie]
    })
  }

  const removeFromWatchlist = (tmdbId: string) => {
    setWatchlist((prev) => prev.filter((movie) => movie.tmdb_id !== tmdbId))
  }

  const clearWatchlist = () => {
    setWatchlist([])
  }

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, clearWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export const useWatchlist = () => {
  const context = useContext(WatchlistContext)
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider')
  }
  return context
}
