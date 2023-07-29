const db = require('../config/db');

class Responsable {
  static getAllResponsables(callback) {
    db.query('SELECT * FROM responsable', callback);
  }

  static getResponsableById(id, callback) {
    db.query('SELECT * FROM responsable WHERE id_res = ?', [id], callback);
  }

  static createResponsable(data, callback) {
    db.query('INSERT INTO responsable SET ?', data, callback);
  }

  static updateResponsable(id, data, callback) {
    db.query('UPDATE responsable SET ? WHERE id_res = ?', [data, id], callback);
  }

  static deleteResponsable(id, callback) {
    db.query('DELETE FROM responsable WHERE id_res = ?', [id], callback);
  }
}

module.exports = Responsable;
