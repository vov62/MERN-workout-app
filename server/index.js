/* eslint-disable padded-blocks */
/* eslint-disable spaced-comment */
/* eslint-disable indent */
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const workoutsRoutes = require('./routes/workoutsRoutes')
const userRoutes = require('./routes/userRoutes')
const path = require('path')

// accept json data from the user
app.use(express.json())

//import db connection
const dbConnection = require('./DB/index')
dbConnection.on('error', () => {
    console.log('connection error')
})

// routes
app.use('/api/workouts', workoutsRoutes)
app.use('/api/user', userRoutes)

// simple middleware
app.use((req, res, next) => {
    // console.log(req.path, req.method)
    next()
})

if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
    })
}

// listen for requests
app.listen(process.env.PORT || 5000, () => {
    console.log('server is running')
})
