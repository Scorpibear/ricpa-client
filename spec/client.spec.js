const nock = require('nock');

const Client = require('../client');

describe('client', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const depth = 40;
  const pingUrl = 'http://myhost:9966/api/ping';

  let client;

  beforeEach(() => {
    client = new Client({hostname: 'ricpa.host.com', port: 9977, path: '/api'});
  });

  it('could be instantialized', () => {
    expect(client).not.toBeNull();
  });

  describe('POST /fen', () => {
    beforeEach(() => {
      nock('http://ricpa.host.com:9977')
        .post('/api/fen')
        .reply(200, {placeInQueue: 4, estimatedTime: '0:12:23'});
    })
    it('executes http request', () => {
      return client.postFen({fen, depth}).then(response => {
        expect(typeof response).toBe('object');
      })
    });
    it('sends fen, depth and ping url', () => {

    });
    it('returns placeInQueue', async () => {
      const {placeInQueue} = await client.postFen({fen, depth});
      expect(placeInQueue).toBe(4);
    });
    it('returns estimatedTime to analyze as H:mm:ss', async () => {
      const {estimatedTime} = await client.postFen({fen, depth});
      expect(estimatedTime).toBe('0:12:23');
    });
  });
  describe('GET /fen', () => {
    it('Returns bestMove for this fen and depth or placeInQueue and estimatedTime when answer could be provided');
    it('sends fen and depth as input');
    it('If fen is not analyzed and is not in queue, gets {bestMove: underfined, placeInQueue: undefined, estimatedTime: underfined}');
  });
  describe('DELETE /fen', () => {
    it('delete specified fen from the queue using fen as input');
  });
  describe('GET /queue', () => {
    it('gets queue as [{fen, depth, estimatedTime}, ...]');
  })
});
