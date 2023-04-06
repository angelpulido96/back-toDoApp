const user = require('../components/users/controller')
const role = require('../components/roles/controller')
const task = require('../components/tasks/controller')

const routes = (app) => {
  app.use('/api/users', user)
  app.use('/api/roles', role)
  app.use('/api/tasks', task)
}

module.exports = routes