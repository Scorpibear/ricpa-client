const nock = require('nock');

const Client = require('../client');

const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

describe('client', () => {
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
    it('executes http request', async () => {
      return client.postFen(fen, 40).then(response => {
        expect(typeof response).toBe('object');
      })
    });
    it('sends fen, depth and ping url');
    /*it('returns placeInQueue from 0', async () => {
      spyOn(http, 'request').and.stub();
      const {placeInQueue} = await client.postFen(fen, 40);
      expect(placeInQueue).toBe(0);
    });*/
    it('returns estimatedTime to analyze as H:mm:ss');
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
