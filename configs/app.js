'use strict'

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3200

const userRoutes = require('../src/routes/user.routes')
const movieRoutes = require('../src/routes/movie.routes')
const invoiceRoutes = require('../src/routes/invoice.routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors())
app.use('/user', userRoutes)
app.use('/movie', movieRoutes)
app.use('/invoice', invoiceRoutes)

exports.initServer = () => app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})