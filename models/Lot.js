const db = require('../config/db');

class Lot {
  static getAllLots(callback) {
    db.query('SELECT * FROM lot', callback);
  }

  static getAllLots2(callback) {
    db.query('SELECT lotissement.code_lotissement as "lotiss", v.code_vocation as "vocation" , l.* FROM lotissement join lot l on lotissement.code_lotissement = l.lotissement join vocation v on v.code_vocation = l.vocation', callback);
  }

  static getLotByAppel(id, callback) {
    db.query('SELECT lo.* FROM lot lo JOIN lotissement l on lo.lotissement = l.code_lotissement join appel_offre_lotissement a on a.lotissement = l.code_lotissement WHERE a.id_appel = ?', [id], callback);
  }

  static getLotByLotissement(id, callback) {
    db.query('SELECT * FROM lot WHERE lotissement = ?', [id], callback);
  }

  static getLotById(id, callback) {
    db.query('SELECT * FROM lot WHERE code_lot = ?', [id], callback);
  }

  static createLot(data, callback) {
    db.query('INSERT INTO lot SET ?', data, callback);
  }

  static updateLot(id, data, callback) {
    db.query('UPDATE lot SET ? WHERE code_lot = ?', [data, id], callback);
  }

  static deleteLot(id, callback) {
    db.query('DELETE FROM lot WHERE code_lot = ?', [id], callback);
  }
}

module.exports = Lot;
