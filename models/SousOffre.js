const db = require('../config/db');

class SousOffre {
  static getAllSousOffres(callback) {
    db.query('SELECT * FROM sous_offre', callback);
  }

  static getAllSousOffresByRetrait(id, callback) {
    db.query('select id_soff, titre, p.nom as "participant", a.nom as "appel" from sous_offre so JOIN retrait_cahier_de_charge r on r.id_retrait = so.retrait join participant p on r.participant = p.code_participant join appel_offre a on a.id_appel = r.id_appof where r.id_retrait = ?',[id], callback);
  }

  static getSousOffreById(id, callback) {
    db.query('SELECT * FROM sous_offre WHERE id_soff = ?', [id], callback);
  }

  static createSousOffre(data, callback) {
    db.query('INSERT INTO sous_offre SET ?', data, callback);
  }

  static updateSousOffre(id, data, callback) {
    db.query('UPDATE sous_offre SET ? WHERE id_soff = ?', [data, id], callback);
  }

  static deleteSousOffre(id, callback) {
    db.query('DELETE FROM sous_offre WHERE id_soff = ?', [id], callback);
  }
}

module.exports = SousOffre;
