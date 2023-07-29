const db = require('../config/db');

class AppelLotissement {
  static getAllAppelLotissement(callback) {
    db.query('SELECT a.nom as "offre", l.nom, aol.* FROM appel_offre_lotissement aol JOIN lotissement l on l.code_lotissement = aol.lotissement join appel_offre a on a.id_appel = aol.id_appel', callback);
  }

  static getAllAppelLotissementByAppel(id, callback) {
    db.query('SELECT a.nom as "offre", l.nom, aol.* FROM appel_offre_lotissement aol JOIN lotissement l on l.code_lotissement = aol.lotissement join appel_offre a on a.id_appel = aol.id_appel WHERE aol.id_appel = ?', [id], callback);
  }

  static getAppelLotissementById(id, callback) {
    db.query('SELECT * FROM appel_offre_lotissement WHERE id_appel_lotissement = ?', [id], callback);
  }


  static createAppelLotissement(data, callback) {
    db.query('INSERT INTO appel_offre_lotissement SET ?', data, callback);
  }

  static updateAppelLotissement(id, data, callback) {
    db.query('UPDATE appel_offre_lotissement SET ? WHERE id_appel_lotissement = ?', [data, id], callback);
  }

  static deleteAppelLotissement(id, callback) {
    db.query('DELETE FROM appel_offre_lotissement WHERE id_appel_lotissement = ?', [id], callback);
  }
}

module.exports = AppelLotissement;
