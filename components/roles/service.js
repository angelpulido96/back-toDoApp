const Role = require('./model')

const getRoles = (data) => {
  try {

  } catch (error) {

  }
}

const createRole = async (data) => {
  let response = {
    created: false
  }
  try {

    const request = new Role(data)
    await request.save()

    response.created = true
  } catch (error) {
    response.error = error
  }
  return response
}

module.exports = {
  getRoles,
  createRole
}