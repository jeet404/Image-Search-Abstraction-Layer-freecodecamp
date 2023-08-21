"use strict";

var SearchHandler = require(process.cwd() +
  "/app/controllers/searchHandler.server.js");

module.exports = function (app, db) {
  var searchHandler = new SearchHandler(db);

  app.route("/").get(function (req, res) {
    res.send(
      "Welcome to the Image Search Abstraction Layer API. Please use the /query/:query endpoint to search for images. You can also use the /latest endpoint to see the latest searches."
    );
  });

  app.route("/query/:query").get(searchHandler.getImages);

  app.route("/recent").get(searchHandler.getSearches);
};
