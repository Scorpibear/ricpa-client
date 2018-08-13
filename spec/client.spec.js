const nock = require('nock');

const Client = require('../client');

describe('client', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const depth = 40;
  const pingUrl = 'http://myhost:9966/api/ping';
  const url = 'http://ricpa.host.com:9977';

  let client;

  beforeEach(() => {
    client = new Client({hostname: 'ricpa.host.com', port: 9977, path: '/api'});
  });

  it('could be instantialized', () => {
    expect(client).not.toBeNull();
  });

  describe('POST /fen', () => {
    beforeEach(() => {
      nock(url)
        .post('/api/fen', {fen, depth, pingUrl})
        .reply(200, {placeInQueue: 4, estimatedTime: '0:12:23'});
    })
    it('executes http request', () => {
      return client.postFen({fen, depth, pingUrl}).then(response => {
        expect(typeof response).toBe('object');
      })
    });
    it('sends fen, depth and ping url', async () => {
      nock(url)
        .post('/api/fen', {fen, depth: 30, pingUrl})
        .reply(200, {placeInQueue: 3});
      const {placeInQueue} = await client.postFen({fen, depth: 30, pingUrl});
      expect(placeInQueue).toBe(3);
    });
    it('returns placeInQueue', async () => {
      const {placeInQueue} = await client.postFen({fen, depth, pingUrl});
      expect(placeInQueue).toBe(4);
    });
    it('returns estimatedTime to analyze as H:mm:ss', async () => {
      const {estimatedTime} = await client.postFen({fen, depth, pingUrl});
      expect(estimatedTime).toBe('0:12:23');
    });
  });
  describe('GET /fen', () => {
    it('Returns bestMove for this fen and depth', async () => {
      nock(url)
        .get('/api/fen')
        .query({fen, depth})
        .reply(200, {bestMove: 'd4'});
      const {bestMove} = await client.getFen({fen, depth});
      expect(bestMove).toBe('d4');
    });
    it('returns placeInQueue and estimatedTime when answer could not be provided', async () => {
      nock(url)
        .get('/api/fen')
        .query({fen, depth: 50})
        .reply(200, {placeInQueue: 3, estimatedTime: '1:23:45'});
      const {placeInQueue, estimatedTime} = await client.getFen({fen, depth: 50});
      expect(placeInQueue).toBe(3);
      expect(estimatedTime).toBe('1:23:45');
    });
    it('Handle undefined results (fen is not in queue, e.g.)', async () => {
      const sentResult = {bestMove: undefined, placeInQueue: undefined, estimatedTime: undefined};
      nock(url)
        .get('/api/fen')
        .query({fen, depth: 12})
        .reply(200, sentResult);
      const result = await client.getFen({fen, depth: 12});
      expect(result).toEqual(sentResult);
    });
  });
  describe('DELETE /fen', () => {
    beforeEach(() => {
      nock(url)
        .delete('/api/fen')
        .query({fen})
        .reply(200);
    })
    it('delete specified fen from the queue using fen as input', async () => {
      const result = await client.deleteFen(fen);
      expect(result).toBe(true);
    });
  });
  describe('GET /queue', () => {
    beforeEach(() => {
      nock(url)
        .get('/api/queue')
        .reply(200, [{fen, depth, estimatedTime: '0:10:59'}]);
    })
    it('gets queue as [{fen, depth, estimatedTime}, ...]', async () => {
      const queue = await client.getQueue();
      expect(queue).toEqual([{fen, depth, estimatedTime: '0:10:59'}]);
    });
  });
});
