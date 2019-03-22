require('dotenv').config();
const { bearerToken, ensureAuth } = require('../../lib/middleware/ensureAuth');
const { tokenize } = require('../../lib/utils/token');

describe('ensureAuth', () => {
  it('can get a bearer token', () => {

    const req = {
      get: () => 'Bearer abcd1234'
    };

    const next = jest.fn();

    bearerToken(req, {}, next);

    expect(req.token).toEqual('abcd1234');
    expect(next).toHaveBeenCalled();
  });

  it('can ensureAuth', () => {
    const token = tokenize({ email: 'test@test.com' });

    const req = {
      token
    };
    const next = jest.fn();

    ensureAuth(req, {}, next)
      .then(() => {
        expect(req.user).toEqual({ email: 'test@test.com' });
        expect(next).toHaveBeenCalled(1);
      });
  });
});
