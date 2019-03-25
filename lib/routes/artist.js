const { Router } = require('express');
const Artist = require('../models/Artist');
// const { ensureAuth } = require('../middleware/ensureAuth');
// const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      artistName,
      facebook,
      bandcamp,
      twitter,
      email,
      genre
    } = req.body;
    Artist
      .create({  
        artistName,
        facebook,
        bandcamp,
        twitter,
        email,
        genre
      })
      .then(artist => res.send(artist))
      .catch(next);
  });

// .get('/', ensureAuth(), (req, res, next) => {
//   Artist
//     .find()
//     .lean()
//     .then(artist => res.send(artist))
//     .catch(next);
// })

// .get('/:id', (req, res, next) => {
//   const id = req.params.id;
//   Artist
//     .findById(id)
//     .then(foundArtist => {
//       if(!foundArtist) {
//         return new HttpError(404, `no artist found with id: ${id}`);
//       }
//       res.send(foundArtist);
//     })
//     .catch(next);
// });
