require('dotenv').config();
require('../../lib/utils/connect')();

const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');

jest.mock('../../lib/services/auth.js');
jest.mock('../../lib/middleware/ensureAuth.js');

const artist = {
  artistName: 'Taylor Swift',
  facebook: 'www.facebook.com/taylor_swift',
  bandcamp: 'www.bandcamp.com/taylor_swift',
  twitter: 'www.twitter.com/taylor_swift',
  email: 'taylor@tswift.com',
  genre: []
};

describe('artist route', () => {
  
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll((done) => {
    mongoose.connection.close(done);
  });

  it('can create an artist', () => {
    return request(app)
      .post('/artist')
      .send({
        artistName: 'Taylor Swift',
        facebook: 'www.facebook.com/taylor_swift',
        bandcamp: 'www.bandcamp.com/taylor_swift',
        twitter: 'www.twitter.com/taylor_swift',
        email: 'taylor@tswift.com',
        genre: []
      })
      .then(res => {
        delete res.body.__v;
        delete res.body._id;
        expect(res.body).toEqual({
          artistName: 'Taylor Swift',
          facebook: 'www.facebook.com/taylor_swift',
          bandcamp: 'www.bandcamp.com/taylor_swift',
          twitter: 'www.twitter.com/taylor_swift',
          email: 'taylor@tswift.com',
          genre: []
        });
      });
  });

  it('can get all artists', () => {
    return request(app)
      .post('/artist')
      .send(artist)
      .then(() => {
        return request(app)
          .get('/artist')
          .then(res => res.body)
          .then(artists => {
            expect(artists).toHaveLength(1);
          });
      });
  });

  it('can get artist by id and will send a 404 if no matches', () => {
    return request(app)
      .post('/artist')
      .send({
        artistName: 'Taylor Swift',
        facebook: 'www.facebook.com/taylor_swift',
        bandcamp: 'www.bandcamp.com/taylor_swift',
        twitter: 'www.twitter.com/taylor_swift',
        email: 'taylor@tswift.com',
        genre: []
      })
      .then(artist => {
        const id = artist._id;
        return request(app)
          .get(`/${id}`)
          .then(res => {
            expect(res.body._id).toEqual(artist._id);
          });
      });
  });
});
