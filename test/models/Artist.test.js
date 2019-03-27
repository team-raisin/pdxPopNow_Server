require('dotenv').config();
require('../../lib/utils/connect')();
const Artist = require('../../lib/models/Artist');
const { Types, connection } = require('mongoose');

describe('validates good artist model', () => {
  
  beforeEach(done => {
    return connection.dropDatabase(() => {
      done();
    });
  });

  afterAll ((done) => {
    connection.close(done);
  });

  it('can validate artist model', () => {
    const artist = new Artist({
      artistName: 'Taylor Swift',
      facebook: 'www.facebook.com/taylor_swift',
      bandcamp: 'www.bandcamp.com/taylor_swift',
      twitter: 'www.twitter.com/taylor_swift',
      soundcloud: 'www.soundcloud.com/taylor_swift',
      youtube: 'www.youtube.com/taylor_swift',
      vimeo: 'www.vimeo.com/taylor_swift',
      img: 'www.picture.com',
      instagram: 'www.instagram.com/taylor_swift',
      contact: 'Taylor Swift',
      description: 'Skateboard narwhal tousled echo park. Venmo forage viral coloring book man bun chicharrones synth letterpress. Cronut skateboard hashtag tofu pitchfork franzen, forage kale chips snackwave jean shorts. Prism activated charcoal skateboard cliche, chartreuse pabst mumblecore biodiesel VHS lomo vegan knausgaard.',
      email: 'taylor@tswift.com',
      genre: []
    });

    expect(artist.toJSON())
      .toEqual({
        artistName: 'Taylor Swift',
        facebook: 'www.facebook.com/taylor_swift',
        bandcamp: 'www.bandcamp.com/taylor_swift',
        twitter: 'www.twitter.com/taylor_swift',
        soundcloud: 'www.soundcloud.com/taylor_swift',
        youtube: 'www.youtube.com/taylor_swift',
        vimeo: 'www.vimeo.com/taylor_swift',
        img: 'www.picture.com',
        instagram: 'www.instagram.com/taylor_swift',
        contact: 'Taylor Swift',
        description: 'Skateboard narwhal tousled echo park. Venmo forage viral coloring book man bun chicharrones synth letterpress. Cronut skateboard hashtag tofu pitchfork franzen, forage kale chips snackwave jean shorts. Prism activated charcoal skateboard cliche, chartreuse pabst mumblecore biodiesel VHS lomo vegan knausgaard.',
        email: 'taylor@tswift.com',
        genre: [],
        _id: expect.any(Types.ObjectId)
      });
  });
});
