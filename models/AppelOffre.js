const db = require('../config/db');

class AppelOffre {
  static getAllAppelsOffre(callback) {
    db.query('select a.*,res.username from appel_offre a join responsable res on res.id_res = a.id_resp', callback);
  }
  
  static getAppelOffreById(id, callback) {
    db.query('SELECT * FROM appel_offre WHERE id_appel = ?', [id], callback);
  }

  static createAppelOffre(data, callback) {
    db.query('INSERT INTO appel_offre SET ?', data, callback);
  }

  static updateAppelOffre(id, data, callback) {
    db.query('UPDATE appel_offre SET ? WHERE id_appel = ?', [data, id], callback);
  }

  static deleteAppelOffre(id, callback) {
    db.query('DELETE FROM appel_offre WHERE id_appel = ?', [id], callback);
  }
}

module.exports = AppelOffre;
