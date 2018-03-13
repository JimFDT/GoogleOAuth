const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const request = require('request-promise')


var app = express();
app.use(bodyParser.json())

app.get('/login-demo/index.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/login-demo/script.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/script.js'))
})

app.get('/tokeninfo', (req, res) => {
  // console.log("req:", req);
  let token = req.query.id_token
  console.log("token:", token);

  let options = {
    uri: `https://www.googleapis.com/oauth2/v3/tokeninfo`,
    qs: {
      id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjMmI2M2ZhZWZjZjgzNjJmNGM1MjhlN2M3ODQzMzg3OTM4NzAxNmIifQ.eyJhenAiOiIxMjYzMjc4MjEzOTEtY2E2YmdzcmlubnJiZ25idDZicG1vdDhxNmJjYzFwYW0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMjYzMjc4MjEzOTEtY2E2YmdzcmlubnJiZ25idDZicG1vdDhxNmJjYzFwYW0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDkwMzU0NzI1MzQ2MzgwODAyNzciLCJlbWFpbCI6ImppbTQwNTEzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoibk5tejRYc2dmTjZNYmh5c3NxY0JtZyIsImV4cCI6MTUyMDkxMTM1NCwiaXNzIjoiYWNjb3VudHMuZ29vZ2xlLmNvbSIsImp0aSI6IjY3YTg4ZjE3NDdjMmE3MTdiYjRhMzY2Mzk3Y2Y2OTZmYmE5YWM2OWEiLCJpYXQiOjE1MjA5MDc3NTQsIm5hbWUiOiJKaW0gV3UiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy0xNEN5TzE0RFc2ay9BQUFBQUFBQUFBSS9BQUFBQUFBQWJIZy9ITVJlMUNNM05TMC9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiSmltIiwiZmFtaWx5X25hbWUiOiJXdSIsImxvY2FsZSI6InpoLVRXIn0.G8dHQCkbkiuE7sXsAnB5IyRnccIJqqvHXW9FSQlRVFQJSukjekGh9cDJujd6B8VAODP2MiiKlNrkSO993bFYrtJObp-PUbh8ZnU0mLiuDsSuMB3d-7BeIsdJjnWP79ZzglHqjpcmq0eGMpSBg_InKuFwZvqCu5q1c63FznnLQE505HN8FczynZjij7EmW6jyzc6VkzssMguiS9Hi5oMs5aDB47IfsykGA2NnmBw3KgX4jvaWFk0z4OFEmzE2HW6z-YjFYNpq3PwvOk_WwddJ3TzvnAwwrVadXv8XDssGatylZ00XMJQTGqzjr7KQNSE5-83EsKhtYvA2wo9JWe-dNw"
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }
  return request(options).then((parsedBody) => {
    // console.log("parsedBody:", parsedBody);
    console.log("user_Name:", parsedBody.name);    
    console.log("user_Email:", parsedBody.email);
    // return parsedBody.data.cipher
  }).catch((err) => {
    throw '[kms] encodeCCR fail. ' + err
  })


})

var server = app.listen(8888, function () {
  console.log('listen on port 8888...');
})