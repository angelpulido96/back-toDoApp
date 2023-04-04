const express = require('express')
const router = express.Router()
const response = require('../../network/responses')
const mongoose = require('mongoose')
const CryptoJS = require("crypto-js")
require('dotenv').config()
const { createUser } = require('./service')

router.get('/', (req, res) => {

})

router.post('/', async (req, res) => {
  const data = req.body
  let errorMessage = 'Unexpected error has occurred'
  try {

    data.password = CryptoJS.AES.encrypt(data.password, process.env.CRYPTOTOKEN).toString()
    data.confirmPassword = CryptoJS.AES.encrypt(data.confirmPassword, process.env.CRYPTOTOKEN).toString()

    const request = await createUser(data)
    if (request.error) {
      throw request.error
    }

    response.success(req, res, 'User created', 201, request)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorValues = Object.values(error.errors)
      errorMessage = errorValues.length > 0 ? errorValues[0].message : 'Validation error'
    } else if (error.code === 11000) {
      errorMessage = 'The email is already in use'
    }
    response.error(req, res, errorMessage, 500, error.message)
  }
})

module.exports = router