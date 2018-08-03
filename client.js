const axios = require('axios');

class Client {
  constructor({hostname, port = 9977, path = '/api', protocol = 'http'}) {
    this.config = {};
    this.config.hostname = hostname;
    this.config.port = port;
    this.config.path = path;
    this.config.fullpath = `${protocol}://${hostname}:${port}${path}`;
  }
  postFen() {
    return axios
      .post(this.config.fullpath + '/fen')
      .then(res => res.data)
      .catch(error => console.error(error));
  }
}

module.exports = Client;
