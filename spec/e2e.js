const Client = require('../client.js');

describe('e2e', () => {
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const depth = 20;

  it('getQueue works', async () => {
    // running of server is out of scope right now
    const client = new Client({hostname: 'localhost'});
    const result = await client.postFen({fen, depth});
    console.log('postFen result: ', result);
    const queue = await client.getQueue();
    console.log('getQueue result: ', queue);
    expect(queue[0].fen).toEqual(fen);
    expect(queue[0].depth).toEqual(depth);
  })
})