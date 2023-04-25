const user = require('../components/users/controller')
const role = require('../components/roles/controller')
const task = require('../components/tasks/controller')
const refresh = require('../components/autentication')

const routes = (app) => {
  app.use('/api/users', user)
  app.use('/api/roles', role)
  app.use('/api/tasks', task)
  app.use('/api/refreshToken', refresh)
}

module.exports = routes