const http = require('http');

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
    it('executes http request', () => {
      spyOn(http, 'request').and.stub();
      client.postFen(fen, 40);
      expect(http.request).toHaveBeenCalledWith({
        method: 'POST', hostname: 'ricpa.host.com', port: 9977, path: '/api/fen'}, jasmine.anything());
    });
    it('sends fen, depth and ping url');
    it('returns place in queue starting from 0 and estimated time to analyze ({placeInQueue, estimatedTime})');
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
