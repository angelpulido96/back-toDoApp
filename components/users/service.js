const User = require('./model')
const { checkPassword } = require('../../network/encrypt')
require('dotenv').config()
const CryptoJS = require("crypto-js")

const getUsers = async (data) => {
  let response = {
    users: []
  }
  try {
    const request = await User.find({ status: 1 })

    response.users = request
  } catch (error) {
    response.error = error
  }
  return response
}

const loginUser = async (data) => {
  let response = {
    user: null
  }
  try {

    const request = await User.findOne({ email: data.email }, { confirmPassword: 0 })

    if (!request) {
      throw new Error('Incorrect user')
    }

    const check = checkPassword(data.password, request.password)
    if (!check) {
      throw new Error('Incorrect password')
    }

    request.password = undefined

    response.user = request
  } catch (error) {
    response.error = error
  }
  return response
}

const createUser = async (data) => {
  let response = {
    created: false
  }
  try {

    const createdUser = new User(data)
    await createdUser.save()

    response.created = true
  } catch (error) {
    response.error = error
  }
  return response
}

const deleteUser = async (id) => {
  let response = {
    deleted: false
  }
  try {

    const request = await User.updateOne({ _id: id }, { $set: { status: 0 } })

    if (request.acknowledged) {
      response.deleted = true
    }
  } catch (error) {
    response.error = error
  }
  return response
}

const updateUser = async (data) => {
  let response = {
    updateted: false
  }
  try {

    const request = await User.updateOne({ _id: data.id },
      {
        $set: {
          name: data.name,
          firstLastName: data.firstLastName,
          secondLastName: data.secondLastName,
          cellphone: data.cellphone,
          email: data.email,
          avatar: data.avatar
        }
      })
    if (!request.modifiedCount) {
      throw new Error('Database error')
    }

    response.updateted = true
  } catch (error) {
    response.error = error
  }
  return response
}

module.exports = {
  getUsers,
  loginUser,
  createUser,
  deleteUser,
  updateUser
}