const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const request = require('request-promise')
const getUserInfo = require('./getUserInfo')
const logger = new(require('./logger'))('./log/serviceLog')
const fs = require('fs-extra')
const session = require('express-session')

fs.ensureDirSync('./log')

var app = express();
app.use(bodyParser.json())

// app.use(session({
//   cookie: {
//     maxAge: 4 * 60 * 60 * 1000
//   },
//   secret: 'frankcastle!@#$%^&*()',
//   resave: true,
//   saveUninitialized: true
// }));

app.get('/login-demo/index.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})
app.get('/login-demo/test.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/test.html'))
})
app.get('/login-demo/script.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/script.js'))
})

app.get('/login-demo/test', (req, res) => {
  console.log('test')
  res.send('ok')
})

app.get('/tokenSignin', (req, res) => {
  // console.log("req.session:", req.session);
  // req.session.tokens = req.query.id_token;
  // console.log("req.query:", req.session);
  getUserInfo(req.query.id_token).then((userEmail) => {
    logger.info(`You are FinDatat User , userEmail: ${userEmail}`)
    res.send()
  }).catch((err) => {
    logger.error('get tokeninfo fail: ' + err)
    res.send()
  })
})

app.listen(8888, () => {
  logger.info('Node server 8888 is running..')
})