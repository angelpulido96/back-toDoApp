require('dotenv').config()
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const CryptoJS = require("crypto-js")
const response = require('../../network/responses')
const { createUser, loginUser, getUsers, deleteUser, updateUser } = require('./service')
const { default: Axios } = require('axios')
const jwt = require('jsonwebtoken');

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

    let request = await loginUser(data)
    const userId = request.user._id.toString()
    const token = jwt.sign({ userId }, process.env.JWT, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ userId }, process.env.JWT, { expiresIn: '24h' })
    const user = {
      ...request.user.toObject(),
      token,
      refreshToken
    }
    if (request.error) {
      throw request.error
    }

    response.success(req, res, 'Loged user', 200, request = { user })
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

  if (data.avatar.url) {
    let base64Code = data.avatar.url.split(',')[1]

    const requestImage = await Axios({
      method: 'POST',
      url: 'https://api.imgur.com/3/image',
      headers: { Authorization: `Client-ID ${process.env.IMGURCLIENTID}` },
      data: base64Code
    })
    data.avatar.url = requestImage.data.data.link
  }

  try {

    if (data.password !== data.confirmPassword) {
      errorMessage = 'Password and Confirm Password are different.'
      throw new Error('Password and Confirm Password are different.')
    } else if (!data.password) {
      errorMessage = 'Password is required'
      throw new Error('Password is required')
    }

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