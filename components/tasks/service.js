const Task = require('./model')
const User = require('../users/model')

const getTasks = async (filters) => {
  let response = {
    tasks: []
  }
  try {

    const request = await Task
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            pipeline: [
              { $project: { password: 0, confirmPassword: 0 } }
            ],
            as: 'createdBy'
          }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            limitDate: 1,
            status: 1,
            createdAt: 1,
            // createdBy: 1, This code will return an object inside an array, to return just one object you need to type below code
            createdBy: {
              $arrayElemAt: ["$createdBy", 0],
            },
          }
        },
        {
          $match: {
            status: 1,
            $or: [
              { title: { $regex: filters.query, $options: 'i' } },
              { 'createdBy.name': { $regex: filters.query, $options: 'i' } },
              { 'createdBy.email': { $regex: filters.query, $options: 'i' } },
              { 'createdBy.cellphone': { $regex: filters.query, $options: 'i' } }
            ]
          }
        }
      ])

    response.tasks = request
  } catch (error) {
    response.error = error
  }
  return response
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


const deleteTask = async (id) => {
  let response = {
    deleted: false
  }
  try {

    const request = await Task.updateOne({ _id: id }, { $set: { status: 0 } })

    if (request.acknowledged) {
      response.deleted = true
    }
  } catch (error) {
    response.error = error
  }
  return response
}

const updateTask = async (data) => {
  let response = {
    updated: false
  }
  try {

    const request = await Task.updateOne({ _id: data.id },
      {
        $set: {
          title: data.title,
          description: data.description,
          limitDate: data.limitDate,
          createdBy: data.createdBy
        }
      })
    if (!request.modifiedCount) {
      throw new Error('Database error')
    }

    response.updated = true
  } catch (error) {
    response.error = error
  }
  return response
}

module.exports = {
  getTasks,
  updateTask,
  deleteTask,
  createTasks
}