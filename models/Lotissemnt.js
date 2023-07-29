// models/Lotissemnt.js
const db = require('../config/db');

class Lotissemnt {
  static getAllLotissemnts(callback) {
    db.query('SELECT * FROM lotissement', callback);
  }

  static getAllLotissemntsByRetrait(id, callback) {
    db.query('select l.* from lotissement l join appel_offre_lotissement al on al.lotissement = l.code_lotissement join appel_offre a on a.id_appel = al.id_appel join retrait_cahier_de_charge r on r.id_appof = a.id_appel where r.id_retrait = ?', [id], callback);
  }

  static getLotissemntById(id, callback) {
    db.query('SELECT * FROM lotissement WHERE code_lotissement = ?', [id], callback);
  }

  static createLotissemnt(data, callback) {
    db.query('INSERT INTO lotissement SET ?', data, callback);
  }

  static updateLotissemnt(id, data, callback) {
    db.query('UPDATE lotissement SET ? WHERE code_lotissement = ?', [data, id], callback);
  }

  static deleteLotissemnt(id, callback) {
    db.query('DELETE FROM lotissement WHERE code_lotissement = ?', [id], callback);
  }
}

module.exports = Lotissemnt;
