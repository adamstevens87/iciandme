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



// Now that the subscription is completed, we need to listen for POST calls at our webhook.
// All callbacks will be made to this webhook.

In our sample app, we handle the all of them. For receiving messages, we look for the event.message field and call the receivedMessage function.
app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});

function receivedMessage(event) {
  // Putting a stub for now, we'll expand it in the following steps
  console.log("Message data: ", event.message);
}
