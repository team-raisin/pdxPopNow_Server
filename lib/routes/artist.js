const { Router } = require('express');
const Artist = require('../models/Artist');
const { HttpError } = require('../middleware/error');
const getSoundCloudId = require('../utils/soundcloud');
const getBandcampId = require('../utils/bandcamp');

module.exports = Router()
  // should this route sit behind authentication?
  .post('/', async(req, res, next) => {
    const {
      artistName,
      contact,
      email,
      img,
      website,
      facebook,
      twitter,
      instagram,
      bandcamp,
      soundcloud,
      youtube,
      vimeo,
      genre,
      description
    } = req.body;

    let soundcloudId = '';
    if(soundcloud) {
      soundcloudId = await getSoundCloudId(soundcloud);
    }

    let bandcampId = '';
    if(bandcamp) {
      bandcampId = await getBandcampId(bandcamp);
    }

    Artist
      .create({
        artistName,
        contact,
        email,
        img,
        website,
        facebook,
        twitter,
        instagram,
        bandcamp,
        soundcloud,
        youtube,
        vimeo,
        genre,
        description,
        soundcloudId,
        bandcampId
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
