'use strict'

const Invoice = require('../models/invoice.model')
const Movie = require('../models/movie.model')
const Ticket = require('../models/ticket.model');
const moment = require('moment')

exports.createInvoice = async (req, res) => {
    try {
        const movieId = req.params.idM
        const sala = req.params.sala
        const params = req.body
        const number = params.seats.length
        const movie = await Movie.findOne({ _id: movieId }).lean()
        let asientos = []

        for (let seat of params.seats) {
            asientos.push(seat[2])
        }
        asientos = asientos.sort((a, b) => {
            return a - b;
        })
        asientos = asientos.toString()
        const hora = movie.salas.filter(salaF => {
            delete salaF._id
            return salaF.numero == sala
        })
        const dataT = {
            movie: movie.nombre,
            imagen: movie.imagen,
            asientos: asientos,
            sala: sala,
            hora: hora[0].hora
        }
        const ticket = new Ticket(dataT)
        ticket.save()
        moment.locale('es')


        const invoices = await Invoice.find()
        const data = {
            usuario: req.user.sub,
            numero: invoices.length + 1,
            date: moment().format('DD MMMM YYYY, h:mm:ss'),
            ticket: ticket._id,
            subTotal: 25,
            cantidad: number,
            total: number * 25
        }


        const invoice = new Invoice(data)
        const saveInvoice = await invoice.save()
        return res.send({ saveInvoice })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error creando factura' })
    }
}

exports.getInvoice = async (req, res) => {
    try {
        const invoiceId = req.params.idI
        const invoice = await Invoice.findOne({ _id: invoiceId })
            .lean()
            .populate('ticket')
            .populate('usuario')

        return res.send({ invoice })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error obteniendo factura' })
    }
}

exports.getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ usuario: req.user.sub })
            .lean()
            .populate('ticket')

        return res.send({ invoices })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error obteniendo facturas' })
    }
}