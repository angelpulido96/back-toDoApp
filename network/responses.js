const chalk = require("chalk")

exports.success = (req, res, message, status = 200, data = {}) => {
    let response = {
        data,
        message,
        error: false
    }
    res.status(status).send(response)
}

exports.error = (req, res, message, status = 500, details) => {
    if (details) console.log(chalk.red('[Internal error]', details))
    let response = {
        data: {},
        message,
        error: true
    }
    res.status(status).send(response)
}