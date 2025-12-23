import express from 'express'
import * as db from '../db/swipes'
import * as matchesDb from '../db/matches'
import { matchRoutes } from 'react-router'

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
// now checks to see if your matches sync up with partners if true goes into shared if not stays in personal
router.post('/', async (req, res) => {
  try {
    const SwipeData = { ...req.body }
    const newSwipe = await db.createSwipe(SwipeData)
    if (SwipeData.liked && SwipeData.relationship_id) {
      const isMatch = await db.checkForMatch(
        SwipeData.userId,
        SwipeData.movie_id,
        SwipeData.relationship_id,
      )

      if (isMatch) {
        const match = await matchesDb.createMatches(
          SwipeData.relationship_id,
          SwipeData.movie_id,
        )
        return res.status(201).json({
          swipe: newSwipe,
          match: match,
          isMatch: true,
        })
      }
    }

    res.status(201).json({ swipe: newSwipe, isMatch: false })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'something went wrong with swipe' })
  }
})

export default router
