var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'ici_and_me_verification') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});
