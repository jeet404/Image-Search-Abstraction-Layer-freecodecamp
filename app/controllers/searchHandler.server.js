"use strict";

var request = require("request");

function searchHandler(db) {
  var searches = db.collection("searches");

  // get results for requested images
  this.getImages = function (req, res) {
    // search terms
    var query = req.params.query;
    var url =
      "https://www.googleapis.com/customsearch/v1?key=AIzaSyDEykaCsoX1-pFpZiadJRhiJBnVPZoHi10&cx=015419526484037096294:77kiid7uhas&searchType=image&imgType=photo&q=";

    // extract the offset from query
    function getOffset(offset) {
      if (offset > 0) return "&start=" + offset;

      return "&start=" + 1;
    }

    // insert in db every term searched
    searches.insert({
      term: query,
      when: new Date(),
    });

    // search for the images
    request(url + query + getOffset(req.query.page), function (err, response) {
      if (err) throw err;

      // parse the response
      var items = JSON.parse(response.body).items;
      var results = [];

      // loop through the results
      for (var i = 0; i < items.length; i++) {
        results.push({
          url: items[i].link,
          snippet: items[i].snippet,
          page: items[i].image.contextLink,
        });
      }

      res.json(results);
    });
  };

  // get the 10 latest search terms
  this.getSearches = function (req, res) {
    // don't need _id
    // limit to 10 results, please
    // sort in ascending order
    // convert to array
    searches
      .find({}, { _id: false })
      .limit(10)
      .sort({ when: -1 })
      .toArray(function (err, items) {
        if (err) throw err;

        res.json(items);
      });
  };
}

module.exports = searchHandler;
