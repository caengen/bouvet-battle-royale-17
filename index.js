const express = require('express')
const app = express()
const TestBot = require('./TestBot')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/command', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(TestBot.command(req)));
})

app.listen(3002, function () {
  console.log('Listening on port 3002!')
})