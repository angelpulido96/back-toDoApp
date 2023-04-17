require('dotenv').config()
const CryptoJS = require("crypto-js")

exports.checkPassword = (toEncrypt, encrypted) => {
    let response = false

    const comingPass = CryptoJS.AES.encrypt(toEncrypt, process.env.CRYPTOTOKEN).toString()
    const descComingPass = CryptoJS.AES.decrypt(comingPass, process.env.CRYPTOTOKEN).toString()
    const comingPassToString = JSON.parse(descComingPass.toString(CryptoJS.enc.Utf8))

    const requestPass = CryptoJS.AES.decrypt(encrypted, process.env.CRYPTOTOKEN).toString()
    const requestPassToString = JSON.parse(requestPass.toString(CryptoJS.enc.Utf8))

    if (comingPassToString === requestPassToString) {
        response = true
    }
    return response
}