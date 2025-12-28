import express from 'express'
import connection from '../db/connection'

const router = express.Router()

router.post('/auth0', async (req, res) => {
  try {
    const user = await connection('users')
    .where({auth_id})
  }
})

export default router
