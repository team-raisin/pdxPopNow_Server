require('dotenv').config();
require('./lib/utils/connect')();

const mongoose = require('mongoose');
const data = require('./lib/utils/csvParser');

data({})
  .then(() => {
    // eslint-disable-next-line no-console
    return console.log('***SEED DATA DEPLOYED & INITIALIZED***');
  })
  .finally(() => {
    return mongoose.connection.close();
  });
