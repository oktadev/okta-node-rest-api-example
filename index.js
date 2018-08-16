const express = require('express')
const bodyParser = require('body-parser')
const { promisify } = require('util')

const initializeDatabase = require('./database')

const app = express()
app.use(bodyParser.json())

const startServer = async () => {
  await initializeDatabase(app)

  const port = process.env.SERVER_PORT || 3000
  await promisify(app.listen).bind(app)(port)
  console.log(`Listening on port ${port}`)
}

startServer()
