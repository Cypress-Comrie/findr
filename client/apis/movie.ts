import request from 'superagent'
import { MovieData } from '../../models/movies'
import { SwipeData } from '../../models/swipes.js'
import { API_KEY } from '../TMDB.js'
import { BASE_URL } from '../TMDB.js'
import { match } from 'node:assert'
import { response } from 'express'

export async function getPopularMovies(): Promise<MovieData[]> {
  const response = await request
    .get(`${BASE_URL}/movie/popular`)
    .query({ api_key: API_KEY })

  // Transform TMDB data to match Movie model
  const tmdbMovies = response.body.results

  return tmdbMovies.map(
    (movie: any): MovieData => ({
      tmdb_id: movie.id,
      title: movie.title,
      release_year: movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 0, // Default to 0 if no date
      genres: movie.genre_ids ? movie.genre_ids.join(',') : '',
      poster_url: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '',
      rating: movie.vote_average || 0,
      description: movie.overview || '',
    }),
  )
}

export async function getMovieDetails(movieId: number): Promise<MovieData> {
  const response = await request
    .get(`${BASE_URL}/movie/${movieId}`)
    .query({ api_key: API_KEY })

  const movie = response.body

  return {
    tmdb_id: movie.id,
    title: movie.title,
    release_year: movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : 0,
    genres: movie.genres ? movie.genres.map((g: any) => g.name).join(', ') : '',
    poster_url: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '',
    rating: movie.vote_average || 0,
    description: movie.overview || '',
  }
}

export async function searchMovies(query: string): Promise<MovieData[]> {
  const response = await request.get(`${BASE_URL}/search/movie`).query({
    api_key: API_KEY,
    query: query,
  })

  const tmdbMovies = response.body.results

  return tmdbMovies.map(
    (movie: any): MovieData => ({
      tmdb_id: movie.id,
      title: movie.title,
      release_year: movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 0,
      genres: movie.genre_ids ? movie.genre_ids.join(',') : '',
      poster_url: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '',
      rating: movie.vote_average || 0,
      description: movie.overview || '',
    }),
  )
}

export async function getRandomMovie(count: number = 30): Promise<MovieData[]> {
  const randomPage = Math.floor(Math.random() * 500) + 1

  const response = await request.get(`${BASE_URL}/movie/popular`).query({
    api_key: API_KEY,
    page: randomPage,
  })

  const tmdbMovies = response.body.results

  const shuffled = tmdbMovies.sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, count)

  return selected.map(
    (movie: any): MovieData => ({
      tmdb_id: movie.id,
      title: movie.title,
      release_year: movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 0,
      genres: movie.genre_ids ? movie.genre_ids.join(',') : '',
      poster_url: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '',
      rating: movie.vote_average || 0,
      description: movie.overview || '',
    }),
  )
}

export async function moviesByDate(year: string): Promise<MovieData[]> {
  const response = await request.get(`${BASE_URL}/discover/movie`).query({
    api_key: API_KEY,
    primary_release_year: year,
    sort_by: 'popularity.desc',
  })

  const tmdbMovies = response.body.results

  return tmdbMovies.map(
    (movie: any): MovieData => ({
      tmdb_id: movie.id,
      title: movie.title,
      release_year: movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 0,
      genres: movie.genre_ids ? movie.genre_ids.join(',') : '',
      poster_url: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '',
      rating: movie.vote_average || 0,
      description: movie.overview || '',
    }),
  )
}
