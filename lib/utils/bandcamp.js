const request = require('superagent');
const getAlbumUrl = userName => `https://${userName}.bandcamp.com/album`;


const getBandCampAlbum = userName => request.get(getAlbumUrl(userName))
  .then(res => {
    console.log(userName);
    return res.text.match(/href="\/album\/(?<album>.*)"/).groups.album;
  })
  .then(album => {
    return request.get(`${getAlbumUrl(userName)}/${album}`); 
  })
  .then(response => {
    return  response.text.match(/https:\/\/bandcamp.com\/EmbeddedPlayer\/v=2\/album=(?<id>\d+)/).groups.id;
  });



module.exports = getBandCampAlbum; 
