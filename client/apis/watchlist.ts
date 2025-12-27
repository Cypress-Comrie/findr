import request from 'superagent'

import { MovieData } from '../../models/movies'

const rootURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export async function getPersonalWatchlist(userId: number) {
  console.log('🌐 API call to:', `${rootURL}/swipes/${userId}`)
  const res = await request.get(`${rootURL}/swipes/${userId}`)
  console.log('🌐 API response:', res.body)
  return res.body
}
