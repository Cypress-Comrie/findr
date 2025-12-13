import request from 'superagent'
import { MovieData } from '../../models/movies'
import { API_KEY } from '../TMDB.js'
import { BASE_URL } from '../TMDB.js'

export async function getPopularMovies() {
  const response = await request
    .get(`${BASE_URL}/movie/popular`)
    .query({ api_key: API_KEY })
  return response.body.results as MovieData[]
}

export async function getMovieDetails(movieId: number) {
  const response = await request
    .get(`${BASE_URL}/movie/${movieId}`)
    .query({ api_key: API_KEY })
  return response.body as MovieData
}

export async function searchMovies(query: string) {
  const response = await request.get(`${BASE_URL}/search/movie`)
}
