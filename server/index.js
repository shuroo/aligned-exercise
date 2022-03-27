const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const movieRouter = require('./routes/user-router')

const app = express()
const apiPort = 9000


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(bodyParser.urlencoded({ extended: true }))
    // to allow cors with post , get, delete , put requests - 
app.use(cors(corsOptions))
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// The API prefix
app.use('/users', movieRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))