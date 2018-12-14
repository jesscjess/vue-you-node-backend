const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    title: String,
    content: String
  }, {
    timestamps: true
  }
);

module.exports = mongoose.model('Review', ReviewSchema);