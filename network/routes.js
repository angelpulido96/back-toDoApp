const user = require('../components/users/controller')
const role = require('../components/roles/controller')

const routes = (app) => {
  app.use('/api/users', user)
  app.use('/api/roles', role)
}

module.exports = routes