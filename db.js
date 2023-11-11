const mongoose = require('mongoose')
require('dotenv').config()
const chalk = require('chalk')

mongoose.Promise = global.Promise
const connectionDB = async() => {
    try {
        mongoose.connect(process.env.MONGOURL)
        console.log(chalk.blue('[Mongoose connected]'))
    } catch (error) {
        process.exit(1)
    }
}

module.exports = connectionDB