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
  contact: {
    type: String
  }, 
  description: {
    type: String
  },
  img: {
    type: String
  }, 
  twitter: {
    type: String
  },
  instagram: {
    type: String
  },
  facebook: {
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
  }
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
