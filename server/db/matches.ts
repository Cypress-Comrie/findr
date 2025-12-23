import db from './connection'
import { Swipe, SwipeData } from '../../models/swipes'
import { MovieData, Movie } from '../../models/movies'
import { Match, MatchData } from '../../models/matches'
import { Relationship, RelationshipData } from '../../models/relationships'

// merges togther the movies and matches collums then provides the movies when the relationship id matches
export async function GetMatches(relationship_id: number): Promise<Match[]> {
  return await db('matches')
    .join('movies', 'matches.movie_id', 'movie.id')
    .where({ 'matches.relationship_id ': relationship_id })
    .select('movies.*')
}

export async function createMatches(
  relationship_id: number,
  movie_id: number,
): Promise<Match> {
  const existing = await db('matches')
    .where({
      relationship_id: relationship_id,
      movie_id: movie_id,
    })
    .first()

  if (existing) {
    return existing
  }

  const [match] = await db('matches')
    .insert({
      relationship_id: relationship_id,
      movie_id: movie_id,
      watched: false,
    })
    .returning('*')

  return match
}
