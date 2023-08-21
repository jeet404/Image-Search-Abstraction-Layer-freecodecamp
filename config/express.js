var express = require('express');
var consign = require('consign');

module.exports = function() {
  var app = express();

  consign({cwd: 'lib'})
  .include('model.js')
  .then('api.js')
  .then('route.js')
  .into(app);

  return app;
}
