require('dotenv').config()
const jwt = require('jsonwebtoken')
const response = require('../network/responses')

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error('No se encuentra el token')
    }

    const decoded = jwt.verify(authorization, process.env.JWT)
    req.user = decoded.userId
    next()
  } catch (err) {
    console.log(err)
    response.error(req, res, 'Invalid user', 401)
  }
}

module.exports = validateToken