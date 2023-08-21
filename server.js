"use strict";

var express = require("express");
var routes = require("./app/routes/index.js");
var mongo = require("mongodb").MongoClient;

var app = express();

var URImongo =
  " mongodb+srv://communitycoder3:hKMASIoylKzHWZOO@cluster0.pn4wuwk.mongodb.net/?retryWrites=true&w=majority";

mongo.connect(URImongo, function (err, db) {
  if (err) throw err;

  console.log("Mongo connected on port 27017...");

  routes(app, db);

  app.listen(process.env.PORT || 8080);
});
