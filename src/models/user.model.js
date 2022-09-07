'use strict'

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    usuario: String,
    contraseña: String,
    nombre: String,
    apellido: String,
    identificación: String,
    correoElectrónico: String,
    teléfono: Number,
    créditos: Number
})

module.exports = mongoose.model('Usuario', userSchema)