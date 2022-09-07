'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'EvaluaciónReactJS'

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) return res.status(403).send({ message: 'La solicitud no contiene la cabecera de autenticación' })

    try {
        const token = req.headers.authorization
        var payload = jwt.decode(token, secretKey)

        if (payload.exp <= moment().unix()) return res.status(401).send({ message: 'Token expirado' })
    } catch (err) {
        return res.status(401).send({ message: 'El token no es válido' })
    }
    req.user = payload
    next()
}