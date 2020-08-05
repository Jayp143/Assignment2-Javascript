const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Id: String,
  Name: String
});

mongoose.model('userSchema', userSchema);
