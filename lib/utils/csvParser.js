const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const Artist = require('../models/Artist');

function data() {
  const input = fs.readFileSync('./fixtures/data.csv', { encoding: 'utf8' });
  const records = parse(input, {
    columns: true,
    skip_empty_lines: true
  });
  return Promise.all(records.map(artist => {
    return Artist.create(artist);
  }));
}

module.exports =  data; 
