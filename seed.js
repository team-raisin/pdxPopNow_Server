require('dotenv').config();
require('./lib/utils/connect')();
const mongoose = require('mongoose');
const seedData = require('./lib/utils/seedData');

seedData({})
  .then(() => {
    // eslint-disable-next-line no-console
    return console.log('***SEED DATA DEPLOYED & INITIALIZED***');
  })
  .finally(() => {
    return mongoose.connection.close();
  });

