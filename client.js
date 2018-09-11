const axios = require('axios');

class Client {
  constructor({hostname, port = 9977, path = '', protocol = 'http'}) {
    this.config = {};
    this.config.hostname = hostname;
    this.config.port = port;
    this.config.path = path;
    this.config.fullpath = `${protocol}://${hostname}:${port}${path}`;
  }
  deleteFen(fen) {
    return axios
      .delete(this.config.fullpath + '/fen', {params: {fen}})
      .then(res => true)
      .catch(error => console.error(error))
  }
  getFen({fen, depth}) {
    return axios
      .get(this.config.fullpath + '/fen', {params: {fen, depth}})
      .then(res =>
        ({
          fen, depth,
          bestMove: res.data.bestMove,
          score: res.data.score,
          placeInQueue: res.data.placeInQueue,
          estimatedTime: res.data.estimatedTime
        }))
      .catch(error => console.error(error));
  }
  getQueue() {
    return axios
      .get(this.config.fullpath + '/queue')
      .then(res => res.data)
      .catch(error => console.error(error));
  }
  postFen({fen, depth, pingUrl}) {
    return axios
      .post(this.config.fullpath + '/fen', {fen, depth, pingUrl})
      .then(res => res.data)
      .catch(error => console.error(error));
  }
}

module.exports = Client;
