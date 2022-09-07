'use strict'

const app = require('./configs/app')
const mongo = require('./configs/mongo')
const movieController = require('./src/controllers/movie.controller')

app.initServer()
mongo.init()
movieController.createMovies()