const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const Directory = require('../../lib/models/Directory');

describe('Directory model', () => {
  beforeEach(() => connect());

  beforeEach(() => mongoose.connection.dropDatabase());

  afterAll(done => mongoose.connection.close(done));

  it('creates a Directory', () => {
    return Directory
      .create({
        user: 'person@email.com',
        text: 'this is text'
        
      })
      .then(directory => {
        expect(directory.toJSON()).toEqual({
          user: 'person@email.com',
          text: 'this is text',
          _id: expect.any(Object),
          __v: expect.any(Number)
        });
      });
  });
});
