import express from 'express'
import * as db from '../db/matches'

const router = express.Router()

// Get route gets the users relationship id and returns all the movies in their couple
router.get('/:relationshipId', async (req, res) => {
  try {
    const relationship_id = Number(req.params.relationshipId)
    const sharedWatchList = await db.GetMatches(relationship_id)
    res.json(sharedWatchList)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Couldnt find matches' })
  }
})

export default router
