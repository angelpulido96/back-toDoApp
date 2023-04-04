require('dotenv').config()
const CryptoJS = require("crypto-js")

exports.checkPassword = (toEncrypt, encrypted) => {
    let response = false

    const pass = CryptoJS.AES.encrypt(toEncrypt, process.env.CRYPTOTOKEN).toString()
    const descPass = CryptoJS.AES.decrypt(pass, process.env.CRYPTOTOKEN).toString()
    const passDesc = JSON.parse(descPass.toString(CryptoJS.enc.Utf8))

    const desc = CryptoJS.AES.decrypt(encrypted, process.env.CRYPTOTOKEN).toString()
    const originalPassword = JSON.parse(desc.toString(CryptoJS.enc.Utf8))

    if (passDesc === originalPassword) {
        response = true
    }
    return response
}