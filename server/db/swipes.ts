import { Swipe, SwipeData } from '../../models/swipes'
import { MovieData, Movie } from '../../models/movies'
import db from './connection'

// creates swipe info for the database
export async function createSwipe(swipeData: SwipeData): Promise<Swipe> {
  const [Swipe] = await db('swipes')
    .insert({
      user_id: swipeData.user_id,
      movie_id: swipeData.movie_id,
      liked: swipeData.liked,
    })
    .returning('*')

  return Swipe
}

// gets the movies from a user watchlist. joins the movies and the swipes tables to see when a user swiped on a movie
// then gives back the movie with all its info
export async function getUserWatchList(user_id: number): Promise<Movie[]> {
  return await db('swipes')
    .join('movies', 'swipes.movie_id', 'movies.id')
    .where({ 'swipes.user_id': user_id, 'swipes.liked': true })
    .select('movies.*')
}
