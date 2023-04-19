const express = require('express')
const chalk = require('chalk')
const app = express()
const cors = require('cors');
const routes = require('./network/routes')
const connectionDB = require('./db')

app.use(express.json({ limit: "200mb" }))
app.use(cors());
app.use(express.urlencoded({ extended: false }))

routes(app)

app.listen(3002, (error) => {
    if (error) console.log(chalk.red('[Connection error]'))
    console.log(chalk.blue('The app is on http://localhost:3002'))
    connectionDB()
})