module.exports = function(app) {
  app.get('/api/imagesearch/:search', app.api.search);

  app.get('/api/latest/imagesearch', app.api.latest);
}
