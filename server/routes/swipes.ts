import express from 'express'
import * as db from '../db/swipes'
import * as matchesDb from '../db/matches'
import { get } from 'node:http'

const router = express.Router()

// Get all movies a user has watchlisted
router.get('/:userId', async (req, res) => {
  try {
    const user_id = Number(req.params.userId)
    const userWatchlisted = await db.getUserWatchList(user_id)
    res.json(userWatchlisted)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to get your watchlist' })
  }
})

// Create a new swipe
router.post('/', async (req, res) => {
  try {
    const swipeData = { ...req.body }

    // Ensure movie_id is a number to match your movies table
    const newSwipe = await db.createSwipe({
      ...swipeData,
      movie_id: Number(swipeData.movie_id),
    })

    // Check for a match if the user liked the movie and is in a relationship
    if (swipeData.liked && swipeData.relationship_id) {
      const isMatch = await db.checkForMatch(
        swipeData.user_id,
        swipeData.relationship_id, // fixed order
        Number(swipeData.movie_id),
      )

      if (isMatch) {
        const match = await matchesDb.createMatches(
          swipeData.relationship_id,
          Number(swipeData.movie_id),
        )

        return res.status(201).json({
          swipe: newSwipe,
          match: match,
          isMatch: true,
        })
      }
    }

    // No match, just return the swipe
    res.status(201).json({ swipe: newSwipe, isMatch: false })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong with swipe' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const movie = Number(req.params.id)
  }
})

export default router
