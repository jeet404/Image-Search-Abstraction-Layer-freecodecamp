const mongoose = require('mongoose');
const ImagesClient = require('google-images');
const config = require('../config');

var api = {};

var ImageSearchHistory = mongoose.model('ImageSearchHistory');

api.search = function(req, res) {
  console.log('Image search request received');
  var term = req.params.search;
  var offset = 1;
  console.log('Search parameter: ' + term);
  if(req.query.offset) {
    console.log('Offset: ' + req.query.offset);
    offset = req.query.offset;
  }
  offset = Math.max(1, offset);

  var searchHistory = { term: term, when : new Date() };

  ImageSearchHistory.create(searchHistory)
  .then(function(result) {
    console.log('Search history included in the database');
  })
  .catch(function(error) {
    console.log('Unable to include the search history in the database');
    console.log(error);
  });

  var searchResult = [];
  var client = new ImagesClient(config.google.images.cseId, config.google.images.apiKey);
  client.search(term, {page: offset})
  .then(function (images) {
    images.forEach(function(image) {
      var imageSearch = {
        url: image.url,
        snippet: image.description,
        thumbnail: image.thumbnail.url,
        context: image.parentPage
      };
      searchResult.push(imageSearch);
    });

    res.json(searchResult);
  })
  .catch(function(error) {
    console.log(error);
    res.status(500).json(error);
  });
};

api.latest = function(req, res) {
  console.log('Latest image search request received');
  ImageSearchHistory.list()
  .then(function(result) {
    let latest = [];
    result.forEach(function(imageSearchHistory) {
       latest.push({term: imageSearchHistory.term, when: imageSearchHistory.when});
    });
    res.json(latest);
  })
  .catch(function(error) {
    console.log(error);
    res.status(500).json(error);
  });
};

module.exports = api;
