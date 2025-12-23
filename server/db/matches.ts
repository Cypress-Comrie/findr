import db from './connection'
import { Swipe, SwipeData } from '../../models/swipes'
import { MovieData, Movie } from '../../models/movies'
import { Match, MatchData } from '../../models/matches'

// merges togther the movies and matches collums then provides the movies when the relationship id matches
export async function GetMatches(relationship_id: number): Promise<Match[]> {
  return await db('matches')
    .join('movies', 'matches.movie_id', 'movie.id')
    .where({ 'matches.relationship_id ': relationship_id })
    .select('movies.*')
}
