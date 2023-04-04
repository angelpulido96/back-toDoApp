const User = require('./model')

const getUsers = (data) => {
  try {

  } catch (error) {

  }
}

const loginUser = async (data) => {
  let response = {
    user: null
  }
  try {

    const request = await User.findOne({ email: data.email })

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

module.exports = {
  getUsers,
  loginUser,
  createUser
}