import express from 'express'
import * as db from '../db/swipes'

const router = express.Router()
// POST /api/swipes - Save a swipe (userId, movieId, liked)

// GET /api/swipes/:userId - Get user's personal watchlist (all their liked movies)

// Getting all users personal watchlist
router.get('/:userId', async (req, res) => {
  try {
    const user_id = Number(req.params.userId)
    const userWatchlisted = await db.getUserWatchList(user_id)
    res.json(userWatchlisted)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'failed to get your watchlist' })
  }
})
export default router
