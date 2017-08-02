let mongoose = require('mongoose');
let connection;

module.exports = function () {
  if (!connection) {
    connection = mongoose.createConnection('mongodb://localhost/curso_mevn');
  }
  return connection;
}

