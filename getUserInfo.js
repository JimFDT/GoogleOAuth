const logger = new(require('./logger'))('./log/serviceLog')
const request = require('request-promise')

// const shortid = require('shortid')

function getUserInfo(idToken) {
  logger.debug(`[getUserInfo] idToken: ${idToken}`)

  let options = {
    uri: `https://www.googleapis.com/oauth2/v3/tokeninfo`,
    qs: {
      id_token: idToken
      // id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjMmI2M2ZhZWZjZjgzNjJmNGM1MjhlN2M3ODQzMzg3OTM4NzAxNmIifQ.eyJhenAiOiIxMjYzMjc4MjEzOTEtY2E2YmdzcmlubnJiZ25idDZicG1vdDhxNmJjYzFwYW0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMjYzMjc4MjEzOTEtY2E2YmdzcmlubnJiZ25idDZicG1vdDhxNmJjYzFwYW0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc4Njg0OTg0NDkzOTgzMjc0NjQiLCJoZCI6ImZpbmRhdGEuY29tLnR3IiwiZW1haWwiOiJqaW1AZmluZGF0YS5jb20udHciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ii1rRjVtamtmdkU3Vnc0TDJhay1UUVEiLCJleHAiOjE1MjA5Mzc0MDUsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiI3N2Y1NjZkMDE1OTlhM2U1NWMzZjkwYTQwZjI4OGM3M2VmOTEzYTk2IiwiaWF0IjoxNTIwOTMzODA1LCJuYW1lIjoi5ZCz5pWs57-UIiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tNXBzaTRUUG1xa2cvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQWMvSmJ4eU9CMEJRNTAvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IuaVrOe_lCIsImZhbWlseV9uYW1lIjoi5ZCzIiwibG9jYWxlIjoiemgtVFcifQ.ojVohtvltPuA10NiV8fdV-B-kxRKyUtJxnvRvBPZAI261qejJKgQIjmFS3iiAtfj9YUU64q9-ckGK3K4Qfn7fHUX8NtnVBDNc-e5QSx-653QFn3omc16bSpoJ9b8JKy6XWWLU7jT-zgN011HeSH685z3p-GLpNa41tsxEitcTOlkTu16A_FafLIkjQQcBf-a2ENgKCpa5e9wVgoQgtNRH8SX8uzCWjIpdUGqZ9hwTA8Tg3k-83Qm7cszFiCcvLQ-wZ0x5exVdw3T--keqlxxIaN9Yw6z_v8Qa9cYGXBADH-Gig5sQFJRdgXm96aOdhLVKWhHScRq08GeGAXLUAkonQ"
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }
  return request(options).then((parsedBody) => {
    console.log("parsedBody:", parsedBody);
    if (parsedBody.hd === undefined || parsedBody.hd !== "findata.com.tw") {
      throw `userName:${parsedBody.name} ,email : ${parsedBody.email} is not Findata User`
    }
    return parsedBody.email
  }).catch((err) => {
    throw '[getUserInfo]  fail. ' + err
  })

}

module.exports = getUserInfo