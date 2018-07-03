const Client = require('../client');

describe('client', () => {
  it('could be instantialized', () => {
    let client = new Client();
    expect(client).not.toBeNull();
  });
});
