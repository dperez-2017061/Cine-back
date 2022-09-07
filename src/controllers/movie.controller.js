'use strict'

const Movie = require('../models/movie.model')
const User = require('../models/user.model')

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find()

        return res.send(movies)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error obteniendo películas' })
    }
}

exports.createMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
        if (movies.length === 0) {
            const array = new Array(5)
            var estrangement = 3
            var number = 1
            for (let i = 0; i < 5; i++) {
                array[i] = new Array(10)
                for (let j = 0; j < 10; j++) {
                    if (estrangement % 3 == 0) {
                        array[i][j] = { estado: 'libre', numero: number }
                    } else {
                        array[i][j] = { estado: 'vacío', numero: number }
                    }
                    estrangement = estrangement + 1
                    number = number + 1
                }
            }
            await Movie.insertMany([
                {
                    nombre: 'El hombre araña', imagen: 'https://www.themoviedb.org/t/p/original/ynyDOCwNuYqqR6p1d6Nbk7ehpfv.jpg', salas: [
                        { numero: 1, hora: '08:30', asientos: array },
                        { numero: 2, hora: '10:00', asientos: array },
                        { numero: 3, hora: '12:30', asientos: array }
                    ]
                },
                {
                    nombre: 'Batman el caballero de la noche asciende', imagen: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRNZixiDVhS4Pj4tHIDHO2nD2Rc1RP1daVRWGwiLywxkYqm7Hww', salas: [
                        { numero: 1, hora: '08:30', asientos: array },
                        { numero: 2, hora: '10:00', asientos: array },
                        { numero: 3, hora: '12:30', asientos: array }
                    ]
                },
                {
                    nombre: 'Los vengadores', imagen: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT4prgaAFROC5b20TABhsgF4eSeehjvRjJC7uud7yQ9QdkNU4sR', salas: [
                        { numero: 1, hora: '08:30', asientos: array },
                        { numero: 2, hora: '10:00', asientos: array },
                        { numero: 3, hora: '12:30', asientos: array }
                    ]
                },
                {
                    nombre: 'Thor Ragnarok', imagen: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSLdqvU9Q1xPXK76edfG5jATJGYY6BvmmENYAqDKl9ee8CZzfN_', salas: [
                        { numero: 1, hora: '08:30', asientos: array },
                        { numero: 2, hora: '10:00', asientos: array },
                        { numero: 3, hora: '12:30', asientos: array }
                    ]
                },
                {
                    nombre: 'Venom carnage liberado', imagen: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ1TWGNcLoyxF51JIQUk9-_ub69rTAVZsQF4YrDpdykAdnyIeU3', salas: [
                        { numero: 1, hora: '08:30', asientos: array },
                        { numero: 2, hora: '10:00', asientos: array },
                        { numero: 3, hora: '12:30', asientos: array }
                    ]
                },
                {
                    nombre: 'Dragon ball super super hero', imagen: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS8AP0KJCtekJp8QZrRZYeaRlUPPEpkfEgRr_js1VTCKLDQ6hKt', salas: [
                        { numero: 1, hora: '08:30', asientos: array },
                        { numero: 2, hora: '10:00', asientos: array },
                        { numero: 3, hora: '12:30', asientos: array }
                    ]
                }
            ])
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error creando películas' })
    }
}

exports.getMovie = async (req, res) => {
    try {
        const movieId = req.params.idM

        const movie = await Movie.findOne({ _id: movieId })
        return res.send(movie)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error obteniendo película' })
    }
}

exports.buyTickets = async (req, res) => {
    try {
        const idMovie = req.params.idM
        const numero = req.params.sala
        const seats = req.body.seats

        let movie = await Movie.findOne({ _id: idMovie }).lean()
        const salas = movie.salas.filter(sala => sala.numero === Number(numero))
        var availableAsets = []
        for (let i = 0; i < 5; i++) {
            availableAsets.push(salas[0].asientos[i].filter(asiento => asiento.estado == 'libre'))
        }

        if (availableAsets[0].length === 0 && availableAsets[1].length === 0 &&
            availableAsets[2].length === 0 && availableAsets[3].length === 0 &&
            availableAsets[4].length === 0) return res.status(404).send({ message: 'No se encontraron asientos disponibles' })

        if (seats.length === 0) return res.status(400).send({ message: 'Elija los asientos a reservar' })
        const user = await User.findOne({ _id: req.user.sub }).lean()
        const total = seats.length * 25
        if (user.créditos < total) return res.status(400).send({ message: 'No tiene créditos necesarios para hacer esta compra' })

        const créditos = user.créditos - total
        await User.findOneAndUpdate({ _id: req.user.sub }, { créditos: créditos })

        for (let seat of seats) {
            salas[0].asientos[seat[0]][seat[1]].estado = 'ocupado'
        }
        movie = movie.salas.map(sala => {
            if (sala.numero == numero) {
                sala.asientos = salas[0].asientos
                delete sala._id
                return sala
            } else {
                delete sala._id
                return sala
            }
        })

        await Movie.findOneAndUpdate({ _id: idMovie }, { salas: movie })

        return res.send({ message: 'Asientos reservados exitosamente' })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error comprando boletos' })
    }

}
