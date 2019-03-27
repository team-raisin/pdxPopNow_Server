const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const Artist = require('../models/Artist');
const getSoundCloudId = require('./soundcloud');


async function data() {
  const input = fs.readFileSync('./fixtures/data.csv', { encoding: 'utf8' });
  const records = parse(input, {
    columns: true,
    skip_empty_lines: true
  });
  const artists = await Promise.all(records.map(async(artist) => {
    if(artist.soundcloud) {
      let soundcloudId = '';
      try {
        soundcloudId = await getSoundCloudId(artist.soundcloud);
      }
      catch(e) {
        console.log(e);
      }
      return {
        ...artist,
        soundcloudId
      };
    }
    return artist;
  }));
  return Artist.create(artists);
}

module.exports =  data; 
