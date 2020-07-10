const mongoose = require('mongoose');

module.exports = mongoose.model('ads', {
  title: String,
  description: String,
  price: Number,
  date: Date,
  category: { type:[String], default: undefined },
  author: { ref: 'users', type: mongoose.Schema.Types.ObjectId },
});