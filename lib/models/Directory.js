const mongoose = require('mongoose');

const directorySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const Directory = mongoose.model('Directory', directorySchema);

module.exports = Directory;
