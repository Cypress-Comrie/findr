import express from 'express'
import * as db from '../db/swipes'

const router = express.Router()

// Getting all users personal watchlisted movies
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

// gets the data from your swipes Example: your userId, the MovieId, True or False on the liked section
// SwipeData sections is for grabbing the data we need from up above and then filling it out with the new swipe
router.post('/', async (req, res) => {
  try {
    const SwipeData = { ...req.body }
    const newSwipe = await db.createSwipe(SwipeData)
    res.status(201).json(newSwipe)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'something went wrong with swipe' })
  }
})

export default router
