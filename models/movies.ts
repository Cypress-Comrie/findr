export interface Movie {
  id: number
  tmdb_id: number
  title: string
  release_year: number
  genres: string
  poster_url: string
  rating: number
  description: string
}

export interface MovieData {
  tmdb_id: number
  title: string
  release_year: number
  genres: string
  poster_url: string
  rating: number
  description: string
}
