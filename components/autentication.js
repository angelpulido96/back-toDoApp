require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const response = require('../network/responses')

router.post('/', (req, res) => {
  const { token, refreshToken } = req.body;

  // verificar si el refresh token es válido
  jwt.verify(refreshToken, process.env.JWT, (err, decoded) => {
    if (err) {
      return response.error(req, res, 'Invalid user', 400)
    }

    // crear un nuevo token de acceso y enviarlo al cliente
    const accessToken = jwt.sign({ userId: token }, process.env.JWT, { expiresIn: '30s' })
    const request = { accessToken }
    response.success(req, res, 'Users list', 201, request)
  })
})

module.exports = router