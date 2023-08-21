const mongoose = require('mongoose');
const express = require('./config/express');
const config = require('./config');
const app = express();

connect()
.on('error', console.log)
.on('disconnected', connect)
.once('open', listen);

function listen() {
  var listener = app.listen(3000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
  });
}

function connect() {
  return mongoose.connect(config.db).connection;
}
