import { app } from './app';
import * as http from 'http'
import mongoose from 'mongoose'
import { MONGO_URI } from './constants';

const port = process.env.PORT || 3000;
const server = http.createServer(app)

server.listen(port, () => console.log(`Started at http://localhost:${port}`))


server.on('listening', async () => {
  mongoose.connect(MONGO_URI, {})
  mongoose.connection.once('open', () => {
    console.info('Connected to Mongo via Mongoose')
  })
  mongoose.connection.on('error', (err) => {
    console.error('Unable to connect to Mongo via Mongoose', err)
  })
})