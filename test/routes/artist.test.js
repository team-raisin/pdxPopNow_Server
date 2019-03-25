require('dotenv').config();
require('../../lib/utils/connect')();

const connection = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');

jest.mock('../../lib/services/auth.js');
jest.mock('../../lib/middleware/ensureAuth.js');

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

  // it('can get all artists', () => {

  // });

  // it('can get artist by id and will send a 404 if no matches', () => {

  // });
});
