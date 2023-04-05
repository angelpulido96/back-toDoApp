require('dotenv').config()
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const response = require('../../network/responses')
const { createTasks } = require('./service')

router.get('/', (req, res) => {
  try {

  } catch (error) {

  }
})

router.post('/', async (req, res) => {
  const data = req.body
  let errorMessage = 'Unexpected error has occurred'
  try {

    const request = await createTasks(data)
    if (request.error) {
      throw request.error
    }

    response.success(req, res, 'Task created', 201, request)
  } catch (error) {
    response.error(req, res, errorMessage, 500, error.message)
  }
})

module.exports = router