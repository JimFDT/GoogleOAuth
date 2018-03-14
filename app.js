const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const request = require('request-promise')
const getUserInfo = require('./getUserInfo')
const logger = new(require('./logger'))('./log/serviceLog')
const fs = require('fs-extra')

fs.ensureDirSync('./log')

var app = express();
app.use(bodyParser.json())


app.get('/login-demo/index.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/login-demo/script.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/script.js'))
})

app.get('/tokeninfo', (req, res) => {
  getUserInfo(req.query.id_token).then((userEmail) => {
    logger.info(`You are FinDatat User , userEmail: ${userEmail}`)
  }).catch((err) => {
    logger.error('get tokeninfo fail: ' + err)
  })
})

app.listen(8888, () => {
  logger.info('Node server 8888 is running..')
})