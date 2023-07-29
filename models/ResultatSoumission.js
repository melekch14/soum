const db = require('../config/db');

class ResultatSoumission {
  static getAllResultatsSoumission(callback) {
    db.query('SELECT * FROM resultat_soumission', callback);
  }

  static getResultatSoumissionById(id, callback) {
    db.query('SELECT * FROM resultat_soumission WHERE id_s = ?', [id], callback);
  }

  static createResultatSoumission(data, callback) {
    db.query('INSERT INTO resultat_soumission SET ?', data, callback);
}

static updateResultatSoumission(id, data, callback) {
  db.query('UPDATE resultat_soumission SET ? WHERE id_s = ?', [data, id], callback);
}

static deleteResultatSoumission(id, callback) {
  db.query('DELETE FROM resultat_soumission WHERE id_s = ?', [id], callback);
}
}

module.exports = ResultatSoumission;

