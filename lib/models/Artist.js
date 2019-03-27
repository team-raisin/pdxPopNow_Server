const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true
  },
  contact: {
    type: String
  }, 
  email: {
    type: String,
    required: true
  }, 
  img: {
    type: String
  }, 
  website: {
    type: String
  },
  facebook: {
    type: String
  },
  twitter: {
    type: String
  },
  instagram: {
    type: String
  },
  bandcamp: {
    type: String
  },
  soundcloud: {
    type: String
  },
  youtube: {
    type: String
  },
  vimeo: {
    type: String
  },
  genre: {
    type: Array
  },
  description: {
    type: String
  },
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
