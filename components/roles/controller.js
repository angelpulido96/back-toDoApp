const express = require('express')
const router = express.Router()
const response = require('../../network/responses')
const { createRole } = require('./service')
const mongoose = require('mongoose')

router.get('/', (req, res) => {
  try {

  } catch (error) {

  }
})

router.post('/', async (req, res) => {
  const data = req.body
  let errorMessage = 'Unexpected error has occurred'
  try {

    const request = await createRole(data)
    if (request.error) {
      throw request.error
    }

    response.success(req, res, 'Role created', 201, request)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorValues = Object.values(error.errors)
      errorMessage = errorValues.length > 0 ? errorValues[0].message : 'Validation error'
    }
    response.error(req, res, errorMessage, 500, error.message)
  }
})

module.exports = router