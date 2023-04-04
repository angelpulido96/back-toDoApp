const express = require('express')
const chalk = require('chalk')
const app = express()
const routes = require('./network/routes')
const connectionDB = require('./db')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

routes(app)

app.listen(3000, (error) => {
    if (error) console.log(chalk.red('[Connection error]'))
    console.log(chalk.blue('The app is on http://localhost:3000'))
    connectionDB()
})