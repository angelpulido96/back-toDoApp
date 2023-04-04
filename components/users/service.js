const User = require('./model')

const getUsers = (data) => {

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
  createUser
}