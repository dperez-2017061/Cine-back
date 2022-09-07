'use strict'

const mongoose = require('mongoose')

exports.init = () => {
    const uriMongo = 'mongodb+srv://dperez:DGatN7su@cadenacines.m6ykric.mongodb.net/?retryWrites=true&w=majority'
    mongoose.Promise = global.Promise

    mongoose.connection.on('error', () => {
        console.log('MongoDB | no se pudo conectar a mongodb')
        mongoose.disconnect()
    })
    mongoose.connection.on('connecting', () => {
        console.log('MongoDB | intentando conectar')
    })
    mongoose.connection.on('connected', () => {
        console.log('MongoDB | conectado a mongodb')
    })
    mongoose.connection.once('open', () => {
        console.log('MongoDB | conectado con la base de datos')
    })
    mongoose.connection.on('reconnected', () => {
        console.log('MongoDB | reconectado a mongodb')
    })
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDb | desconectado')
    })
    mongoose.connect(uriMongo, {
        maxPoolSize: 15,
        connectTimeoutMS: 2500,
        useNewUrlParser: true
    }).catch(err => console.log(err))
}