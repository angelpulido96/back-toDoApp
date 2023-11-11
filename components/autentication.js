require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const response = require('../network/responses')

router.post('/', (req, res) => {
  const { token, refreshToken } = req.body;

  // Verify if refreshToken is valid
  jwt.verify(refreshToken, process.env.JWT, (err, decoded) => {
    if (err) {
      return response.error(req, res, 'Invalid user', 400)
    }

    // Create new accessToken
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT, { expiresIn: '1h' })
    const request = { accessToken }
    response.success(req, res, 'Users list', 201, request)
  })
})

module.exports = router