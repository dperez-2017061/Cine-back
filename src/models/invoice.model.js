'use strict'

const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    usuario: { type: mongoose.Schema.ObjectId, ref: 'Usuario' },
    numero: Number,
    date: String,
    ticket: {type: mongoose.Schema.ObjectId, ref: 'Ticket'},
    subTotal: Number,
    cantidad: Number,
    total: Number,
})

module.exports = mongoose.model('Factura', invoiceSchema)
