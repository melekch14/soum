// models/Lotissemnt.js
const db = require('../config/db');

class Vocation {
  static getAllVocations(callback) {
    db.query('SELECT * FROM vocation', callback);
  }

  static getVocationById(id, callback) {
    db.query('SELECT * FROM vocation WHERE code_vocation = ?', [id], callback);
  }

  static createVocation(data, callback) {
    db.query('INSERT INTO vocation SET ?', data, callback);
  }

  static updateVocation(id, data, callback) {
    db.query('UPDATE vocation SET ? WHERE code_vocation = ?', [data, id], callback);
  }

  static deleteVocation(id, callback) {
    db.query('DELETE FROM vocation WHERE code_vocation = ?', [id], callback);
  }
}

module.exports = Vocation;
