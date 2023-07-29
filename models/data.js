const db = require('../config/db');

function fetchData(id, callback) {
  const query = `
  SELECT r.id_retrait AS id_offre, s.id_soff AS id_sous_offre, p.nom AS participant, l.code_lot, su.principal AS lot_principal, su.option1 AS lot_option1, su.option2 AS lot_option2 FROM sous_offre s JOIN retrait_cahier_de_charge r ON s.retrait = r.id_retrait JOIN participant p ON r.participant = p.code_participant LEFT JOIN soumission su ON s.id_soff = su.id_s_offre LEFT JOIN lot l ON l.code_lot = su.lot where r.id_appof = ? ORDER by r.id_retrait;
  `;

  db.query(query, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = {
  fetchData,
};
