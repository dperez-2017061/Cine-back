'use strict'

const express = require('express')
const api = express.Router()
const mdAuth = require('../middlewares/authenticated')
const invoiceController = require('../controllers/invoice.controller')

api.post('/createInvoice/:idM/:sala', mdAuth.ensureAuth, invoiceController.createInvoice)
api.get('/getInvoice/:idI', mdAuth.ensureAuth, invoiceController.getInvoice)
api.get('/getInvoices', mdAuth.ensureAuth, invoiceController.getInvoices)

module.exports = api