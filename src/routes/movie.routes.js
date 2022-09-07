'use strict'

const express = require('express')
const api = express.Router()
const mdAuth = require('../middlewares/authenticated')
const movieController = require('../controllers/movie.controller')

api.get('/getMovies', movieController.getMovies)
api.get('/getMovie/:idM',  movieController.getMovie)
api.put('/buyTickets/:idM/:sala', mdAuth.ensureAuth, movieController.buyTickets)

module.exports = api