const { Router } = require('express');
const Directory = require('../models/Directory');
const ensureAuth = require('../middleware/ensureAuth');


module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { text } = req.body;
    Directory
      .create({ text, user: req.user.user_id })
      .then(directory => res.json(directory))
      .catch(next);
  });
