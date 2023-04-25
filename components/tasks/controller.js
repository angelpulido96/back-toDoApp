require('dotenv').config()
const express = require('express')
const moment = require('moment')
const router = express.Router()
const mongoose = require('mongoose')
const validateToken = require('../../middelware/validateToken')
const response = require('../../network/responses')
const { createTasks, getTasks, updateTask, deleteTask } = require('./service')

router.get('/', validateToken, async (req, res) => {
  const filters = req.query
  let errorMessage = 'Unexpected error has occurred'
  try {

    const request = await getTasks(filters)
    if (request.error) {
      throw request.error
    }

    response.success(req, res, 'Tasks list', 201, request)
  } catch (error) {
    response.error(req, res, errorMessage, 500, error.message)
  }
})

router.post('/', async (req, res) => {
  const data = req.body
  let errorMessage = 'Unexpected error has occurred'
  try {

    data.limitDate = moment(data.limitDate, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

    const request = await createTasks(data)
    if (request.error) {
      throw request.error
    }

    response.success(req, res, 'Task created', 201, request)
  } catch (error) {
    response.error(req, res, errorMessage, 500, error.message)
  }
})

router.patch('/delete/:id', async (req, res) => {
  const { id } = req.params
  let errorMessage = 'Unexpected error has occurred'
  try {

    const request = await deleteTask(id)
    if (request.error) {
      throw request.error
    }

    response.success(req, res, 'Task deleted', 201, request)
  } catch (error) {
    response.error(req, res, errorMessage, 500, error.message)
  }
})

router.patch('/', async (req, res) => {
  const data = req.body
  let errorMessage = 'Unexpected error has occurred'
  try {

    data.limitDate = moment(data.limitDate, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

    const request = await updateTask(data)
    if (request.error) {
      throw request.error
    }

    response.success(req, res, 'Task updated', 201, request)
  } catch (error) {
    response.error(req, res, errorMessage, 500, error.message)
  }
})

module.exports = router