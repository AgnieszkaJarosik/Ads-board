const mongoose = require('mongoose');

module.exports = mongoose.model('users', {
  firstName: String,
  lastName: String,
  login: { type: String, select: false },
  password: { type: String, select: false },
});