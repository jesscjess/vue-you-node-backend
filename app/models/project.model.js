const mongoose = require('mongoose');

const ProjecSchema = mongoose.Schema({
    title: String,
    url: String,
    content: String
  }, {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', ProjecSchema);