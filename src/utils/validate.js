'use strict'

const bcrypt = require('bcrypt-nodejs')

exports.validateData = async (data) => {
    let keys = Object.keys(data), msg = ''

    for (let key of keys) {
        if (data[key] !== null && data[key] !== undefined && data[key] !== '' && data[key] !== 0) continue
        msg += `El parámetro ${key} es obligatorio\n`
    } return msg.trim()
}

exports.encrypt = async (contraseña) => {
    try {
        return bcrypt.hashSync(contraseña)
    } catch (err) {
        console.log(err)
        return err
    }
}

exports.checkPassword = async (password, hash) => {
    try {
        return bcrypt.compareSync(password, hash)
    } catch (err) {
        console.log(err)
        return err
    }
}