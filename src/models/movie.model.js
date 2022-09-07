'use strict'

const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    nombre: String,
    imagen: String,
    salas: [{
        numero: Number,
        hora: String,
        asientos: [
            [{
                estado: String,
                numero: Number
            }]
        ]
    }]
})

module.exports = mongoose.model('Película', movieSchema)