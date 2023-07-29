const db = require('../config/db');

class OffreDeSoumission {
  static getAllOffresDeSoumission(callback) {
    db.query('SELECT r.* , p.nom , a.nom as "offre" from retrait_cahier_de_charge r join participant p on p.code_participant = r.participant join appel_offre a on a.id_appel = r.id_appof', callback);
  }

  static getOffreDeSoumissionById(id, callback) {
    db.query('SELECT * FROM retrait_cahier_de_charge WHERE id_retrait = ?', [id], callback);
  }

  static createOffreDeSoumission(data, callback) {
    db.query('INSERT INTO retrait_cahier_de_charge SET ?', data, callback);
  }

  static updateOffreDeSoumission(id, data, callback) {
    db.query('UPDATE retrait_cahier_de_charge SET ? WHERE id_retrait = ?', [data, id], callback);
  }

  static deleteOffreDeSoumission(id, callback) {
    db.query('DELETE FROM retrait_cahier_de_charge WHERE id_retrait = ?', [id], callback);
  }
}

module.exports = OffreDeSoumission;
