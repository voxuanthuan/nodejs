var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  avatar: String,
  phone: String,
  password: String,
})

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;