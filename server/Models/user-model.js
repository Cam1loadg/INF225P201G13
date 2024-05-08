const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  rut: String,
  password: String,
  cargo: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;