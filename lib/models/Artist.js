const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }, 
  description: {
    type: String,
  },
  profilePic: {
    type: String
  }, 
  twitter: {
    type: String
  },
  facebook: {
    type: String
  },
  bandcamp: {
    type: String
  },
  genre: {
    type: Array
  }
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
