import request from 'superagent'

import { MovieData } from '../../models/movies'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getPersonalWatchlist(
  userId: number,
): Promise<MovieData[]> {
  const res = await request.get(`${rootURL}/swipes/${userId}`)

  return res.body
}
