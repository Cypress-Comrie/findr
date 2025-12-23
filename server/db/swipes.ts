import { Swipe, SwipeData } from '../../models/swipes'
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
