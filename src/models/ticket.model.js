'use strict'

const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    movie: String,
    imagen: String,
    asientos: String,
    sala: Number,
    hora: String
})

module.exports = mongoose.model('Ticket', ticketSchema)