const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/crm-rest-template', { target: 'http://10.4.127.199:9029/' }));
};