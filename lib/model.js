const mongoose = require('mongoose');

const ImageSearchHistory = mongoose.Schema({
  term: { type: String, required: true },
  when: { type: Date, required: true }
});

ImageSearchHistory.statics = {
  list: function(options) {
    options = options || {};
    const criteria = options.criteria || {};
    const limit = options.limit || 10;
    return this.find(criteria)
    .sort({when: -1})
    .limit(limit)
    .exec();
  }
}

mongoose.model('ImageSearchHistory', ImageSearchHistory);
