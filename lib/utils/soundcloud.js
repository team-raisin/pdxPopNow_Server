const request = require('superagent');

const getSoundCloudId = url => request.get(url)
  .then(res => {
    return res.text.match(/users:(?<id>\d+)/).groups.id;
  });

module.exports = getSoundCloudId; 
