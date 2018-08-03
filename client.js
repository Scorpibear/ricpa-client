const http = require('http');

class Client {
  constructor({hostname, port = 9977, path = '/api'}) {
    this.config = {};
    this.config.hostname = hostname;
    this.config.port = port;
    this.config.path = path;
  }
  postFen() {
    http.request( {
      method: 'POST',
      hostname: this.config.hostname,
      port: this.config.port,
      path: this.config.path + '/fen'
    }, response => {

    });
  }
}

module.exports = Client;
