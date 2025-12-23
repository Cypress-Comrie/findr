import express from 'express'
import * as db from '../db/swipes'

const router = express.Router()
// POST /api/swipes - Save a swipe (userId, movieId, liked)
// GET /api/swipes/:userId - Get user's personal watchlist (all their liked movies)
export default router
