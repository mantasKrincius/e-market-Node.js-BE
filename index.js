require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/routes')

const corsOptions = {
    allowedHeaders: ['userauth', 'Content-Type'],
    exposedHeaders: ['userauth'],
}

mongoose.connect('mongodb://localhost/mantasShop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => console.log('Logged into database'))

const app = express()
app.use(cors(corsOptions))
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
)

app.use(
    bodyParser.json({
        limit: '50mb',
    }),
)

app.use('/uploads', express.static('uploads'))
app.use('/api/v1', router)



app.listen(3000)