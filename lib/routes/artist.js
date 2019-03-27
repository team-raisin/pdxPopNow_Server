const { Router } = require('express');
const Artist = require('../models/Artist');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      artistName,
      facebook,
      bandcamp,
      twitter,
      email,
      contact, 
      soundcloud,
      youtube,
      vimeo,
      instagram,
      img,
      genre,
      description
    } = req.body;
    Artist
      .create({  
        artistName,
        facebook,
        bandcamp,
        twitter,
        email,
        genre,
        contact, 
        soundcloud,
        youtube,
        vimeo,
        instagram,
        img,
        description
      })
      .then(artist => res.send(artist))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Artist
      .find()
      .lean()
      .then(artists => res.send(artists))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Artist
      .findById(id)
      .then(foundArtist => {
        if(!foundArtist) {
          return new HttpError(404, `no artist found with id: ${id}`);
        }
        res.send(foundArtist);
      })
      .catch(next);
  });
