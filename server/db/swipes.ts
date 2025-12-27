import { Swipe, SwipeData } from '../../models/swipes'
import { MovieData, Movie } from '../../models/movies'
import { Match, MatchData } from '../../models/matches'
import { Relationship, RelationshipData } from '../../models/relationships'
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
    .join('movies', 'swipes.movie_id', 'movies.tmdb_id')
    .where({ 'swipes.user_id': user_id, 'swipes.liked': true })
    .select('movies.*')
}

// checks to see if youre in a relationship, if true checks if partner also liked the movie
export async function checkForMatch(
  user_id: number,
  relationship_id: number,
  movie_id: number,
): Promise<boolean> {
  const relationship = await db<Relationship>('relationships')
    .where('id', relationship_id)
    .first()

  if (!relationship) return false

  const PartnerId =
    relationship.user1_id === user_id
      ? relationship.user2_id
      : relationship.user1_id

  const partnerSwipe = await db<Swipe>('swipes')
    .where({
      user_id: PartnerId,
      movie_id: movie_id,
      liked: true,
    })
    .first()

  return !!partnerSwipe
}
