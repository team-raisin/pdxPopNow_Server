const { Router } = require('express');
const Artist = require('../models/Artist');
const ensureAuth = require('../middleware/ensureAuth');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { text } = req.body;
    Artist
      .create({ text, user: req.user.user_id })
      .then(artist => res.json(artist))
      .catch(next);
  })

  .get('/', ensureAuth(), (req, res, next) => {
    Artist
      .find()
      .lean()
      .then(artist => res.send(artist))
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
