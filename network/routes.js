const user = require('../components/users/controller')

const routes = (app) => {
    app.use('/api/users', user)
}

module.exports = routes