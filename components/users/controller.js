require('dotenv').config()
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const CryptoJS = require("crypto-js")
const response = require('../../network/responses')
const { createUser, loginUser, getUsers, deleteUser, updateUser } = require('./service')

router.get('/', async (req, res) => {
  let errorMessage = 'Unexpected error has occurred'
  try {

    const request = await getUsers()
    if (request.error) {
      throw request.error
    }

    response.success(req, res, 'Users list', 200, request)
  } catch (error) {
    response.error(req, res, errorMessage, 500, error.message)
  }
})

router.post('/login', async (req, res) => {
  const data = req.body
  let errorMessage = 'Unexpected error has occurred'
  try {

    const request = await loginUser(data)
    if (request.error) {
      throw request.error
    }

    response.success(req, res, 'Loged user', 200, request)
  } catch (error) {
    if (error.message === 'Incorrect password') {
      errorMessage = 'Incorrect email or password'
    }
    if (error.message === 'Incorrect user') {
      errorMessage = 'Incorrect email or password'
    }

    response.error(req, res, errorMessage, 500, error.message)
  }
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

router.patch('/delete/:id', async (req, res) => {
  const { id } = req.params
  let errorMessage = 'Unexpected error has occurred'
  try {

    const request = await deleteUser(id)
    if (request.error) {
      throw request.error
    }

    response.success(req, res, 'Deleted user', 201, request)
  } catch (error) {
    response.error(req, res, errorMessage, 500, error.message)
  }
})

router.patch('/', async (req, res) => {
  const data = req.body
  let errorMessage = 'Unexpected error has occurred'
  try {
    const request = await updateUser(data)
    if (request.error) {
      throw request.error
    }

    response.success(req, res, 'Updated user', 201, request)
  } catch (error) {
    response.error(req, res, errorMessage, 500, error.message)
  }
})

module.exports = router