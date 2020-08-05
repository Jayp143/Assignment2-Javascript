var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('AdSchema', AdSchema);