const Task = require('./model')

const getTasks = (data) => {
  try {

  } catch (error) {

  }
}

const createTasks = async (data) => {
  let response = {
    created: false
  }
  try {

    const request = new Task(data)
    await request.save()

    response.created = true
  } catch (error) {
    response.error = error
  }
  return response
}

module.exports = {
  getTasks,
  createTasks
}