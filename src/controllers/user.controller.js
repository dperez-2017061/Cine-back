'use strict'

const User = require("../models/user.model")
const jwt = require('../services/jwt')
const { validateData, encrypt, checkPassword } = require("../utils/validate")

exports.register = async (req, res) => {
    try {
        const params = req.body
        const data = {
            usuario: params.usuario,
            contraseña: params.contraseña,
            nombre: params.nombre,
            apellido: params.apellido,
            identificación: params.identificación,
            correoElectrónico: params.correo,
            teléfono: params.teléfono,
            créditos: 200
        }

        const msg = await validateData(data)
        if (msg) return res.status(400).send(msg)
        const userExist = await User.findOne({ usuario: data.usuario })
        if (userExist) return res.status(400).send({ message: `El usuario ${data.usuario} ya existe` })
        const phoneExist = await User.findOne({ teléfono: data.teléfono })
        if (phoneExist) return res.status(400).send({ message: `El teléfono ${data.teléfono} ya existe` })
        const emailExist = await User.findOne({ correoElectrónico: data.correoElectrónico })
        if (emailExist) return res.status(400).send({ message: `El correo ${data.correoElectrónico} ya existe` })
        data.contraseña = await encrypt(data.contraseña)

        const user = new User(data)
        await user.save()
        return res.send({ message: ' Usuario creado satisfactoriamente' })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error registrando usuario' })
    }
}

exports.login = async (req, res) => {
    try {
        const params = req.body

        const data = {
            usuario: params.usuario,
            contraseña: params.contraseña
        }

        const msg = await validateData(data)
        if (msg) return res.status(500).send(msg)
        const userExist = await User.findOne({ usuario: data.usuario })
            .lean()

        if (!userExist || !await checkPassword(data.contraseña, userExist.contraseña)) return res.status(401).send({ message: 'Credenciales inválidas' })
        const token = await jwt.createToken(userExist)
        delete userExist.contraseña

        return res.send({ token, userExist, message: 'Inicio de sesión satisfactorio' })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Error iniciando sesión' })
    }
}