import express from 'express'
import connection from '../db/connection'
import { Relationship } from '../../models/relationships'

const router = express.Router()

// Get all relationships for a user
router.get('/:userId', async (req, res) => {
  try {
    const user_id = Number(req.params.userId)
    const relationships = await connection<Relationship>('relationships')
      .where('user1_id', user_id)
      .orWhere('user2_id', user_id)
      .select('*')

    res.json(relationships)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to get relationships' })
  }
})

export default router
