const { Router } = require('express');
const Artist = require('../models/Artist');
const ensureAuth = require('../middleware/ensureAuth');



module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { text } = req.body;
    Artist
      .create({ text, user: req.user.user_id })
      .then(artist => res.json(artist))
      .catch(next);
  });
