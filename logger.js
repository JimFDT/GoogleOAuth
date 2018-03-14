/**
 * Created by yclin on 2016/6/4.
 */

let winston = require('winston')
let moment = require('moment')
const fs = require('fs-extra')

winston.transports.DailyRotateFile = require('winston-daily-rotate-file')
winston.transports.Elasticsearch = require('winston-elasticsearch')


let loggerObj

function logger(configFilePath, elaticClient) {

  if (loggerObj) {
    return loggerObj
  }

  loggerObj = new winston.Logger({
    transports: [
      new winston.transports.Console({
        json: false,
        timestamp: true,
        colorize: false,
        level: 'debug',
      }),
      new winston.transports.DailyRotateFile({
        filename: configFilePath,
        json: false,
        timestamp: true,
        level: 'debug',
      }),
      /*   new winston.transports.Elasticsearch({
           level: 'info',
           index: 'pepconsole-' + moment(new Date()).format('YYYY.MM'),
           client: elaticClient,
         })*/
    ]
  })
  return loggerObj
}

module.exports = logger