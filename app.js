var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Welcome to iciandme!');
});
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'ici_and_me_verification') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});
