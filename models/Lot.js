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

  static getLotByLot(id, callback) {
    db.query("WITH lot_aggregated AS ( SELECT l.code_lot, l.vocation, l.surface, MAX(s.option1 + s.principal + s.option2) AS max_sum, MIN(s.option1 + s.principal + s.option2) AS min_sum, COUNT(s.option1 + s.principal + s.option2) AS nb, SUM(s.option1 + s.principal + s.option2) / COUNT(s.option1 + s.principal + s.option2) AS avg_sum FROM lot l JOIN soumission s ON s.lot = l.code_lot WHERE l.code_lot = ? ) SELECT p.code_participant, p.nom, MAX(GREATEST(s.principal, s.option1, s.option2)) AS max_soumission, la.code_lot, la.vocation, la.surface, la.max_sum, la.min_sum, la.nb, la.avg_sum, la.surface * la.max_sum AS chiffre_affaire FROM participant p JOIN retrait_cahier_de_charge rcc ON p.code_participant = rcc.participant JOIN sous_offre so ON rcc.id_retrait = so.retrait JOIN soumission s ON so.id_soff = s.id_s_offre JOIN lot l ON s.lot = l.code_lot LEFT JOIN lot_aggregated la ON l.code_lot = la.code_lot WHERE l.code_lot = ? GROUP BY p.code_participant, p.nom, la.code_lot, la.vocation, la.surface, la.max_sum, la.min_sum, la.nb, la.avg_sum ORDER BY max_soumission DESC LIMIT 1;", [id,id], callback);
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
