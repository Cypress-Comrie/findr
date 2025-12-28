import express from 'express'
import connection from '../db/connection'

const router = express.Router()

router.post('/auth0', async (req, res) => {
  try {
    const { auth0_id, email, name } = req.body
    let user = await connection('users').where({ auth0_id }).first()

    if (!user) {
      const [newUser] = await connection('users')
        .insert({ auth0_id, email, name })
        .returning('*')
      user = newUser
    }
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to Get/Make user' })
  }
})

export default router
