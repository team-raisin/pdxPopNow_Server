const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const Artist = require('../models/Artist');
const getSoundCloudId = require('./soundcloud');
const getBandCampAlbum = require('./bandcamp');


async function data() {
  const input = fs.readFileSync('./fixtures/data.csv', { encoding: 'utf8' });
  const records = parse(input, {
    columns: true,
    skip_empty_lines: true
  });
  const artists = await Promise.all(records.map(async(artist) => {
    const match = artist.bandcamp.trim().match(/^https:\/\/(?<artistName>\w*)\.\w*\.com$/);
    const bandcampName = match && match.groups.artistName;
    let bandcampAlbum = '';
    if(bandcampName) {
      try {
        bandcampAlbum = await getBandCampAlbum(bandcampName);
        console.log(bandcampAlbum);
      }
      catch(e) {
        console.log(e);
      }
    }
    let soundcloudId = '';
    if(artist.soundcloud) {
      try {
        soundcloudId = await getSoundCloudId(artist.soundcloud);
      }
      catch(e) {
        console.log(e);
      }
    
    }
    return {
      ...artist,
      soundcloudId,
      bandcampAlbum
    };
  }));
  return Artist.create(artists);
}

data();
module.exports =  data; 
