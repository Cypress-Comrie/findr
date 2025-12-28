import express from 'express'
import * as Path from 'node:path'
import matches from './routes/matches'
import swipes from './routes/swipes'
import users from './routes/users'
import cors from 'cors'

const server = express()
server.use(cors())
server.use(express.json())

server.use('/api/v1/matches', matches)
server.use('/api/v1/swipes', swipes)
server.use('/api/v1/users', users)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
