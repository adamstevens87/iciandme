var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/privacy', function (req, res) {
  res.send('Privacy Policy!');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

// Arbitrary value used to validate a webhook
const VALIDATION_TOKEN = 'ici_and_me_verification';


app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});
