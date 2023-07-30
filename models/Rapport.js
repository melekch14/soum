const db = require('../config/db');

class Rapport {

    static getStatByAppel(id, callback) {
        db.query("SELECT nbS, (option1_sum + option2_sum + principal_sum) / nbS AS sum_of_three_columns_avg, GREATEST(max_option1, max_option2, max_principal) AS max_value, lot, surface FROM ( SELECT COUNT(id_soum) AS nbS, SUM(option1) AS option1_sum, SUM(option2) AS option2_sum, SUM(principal) AS principal_sum, MAX(option1) AS max_option1, MAX(option2) AS max_option2, MAX(principal) AS max_principal, l.code_lot AS 'lot', l.surface AS 'surface' FROM soumission s JOIN sous_offre so ON so.id_soff = s.id_s_offre JOIN retrait_cahier_de_charge r ON r.id_retrait = so.retrait join lot l on l.code_lot = s.lot WHERE r.id_appof = ? GROUP BY l.code_lot, l.surface ) AS subquery_alias", [id], callback);
    }

    static getOffreByAppel(id, callback) {
        db.query("SELECT S.lot, p.nom, (S.option1 + S.option2 + S.principal) AS total_soumission FROM soumission S JOIN sous_offre SO ON S.id_s_offre = SO.id_soff JOIN retrait_cahier_de_charge R ON SO.retrait = R.id_retrait join participant p on p.code_participant = R.participant WHERE (SELECT COUNT(*) FROM soumission S2 WHERE S2.lot = S.lot AND (S2.option1 + S2.option2 + S2.principal) > (S.option1 + S.option2 + S.principal)) < 3 and R.id_appof = ? ORDER BY S.lot, total_soumission DESC", [id], callback);
    }

    static getStatPerSecteurByAppel(id, callback) {
        db.query("SELECT l.vocation, COUNT(s.option1 + s.principal + s.option2) AS count_sum, SUM(s.option1 + s.principal + s.option2) / COUNT(s.option1 + s.principal + s.option2) AS avg, MIN(s.option1 + s.principal + s.option2) AS min_sum, MAX(s.option1 + s.principal + s.option2) AS max_sum FROM soumission s JOIN lot l ON l.code_lot = s.lot JOIN sous_offre so ON so.id_soff = s.id_s_offre JOIN retrait_cahier_de_charge r ON r.id_retrait = so.retrait WHERE r.id_appof = ? GROUP BY l.vocation ORDER BY  l.vocation", [id], callback);
    }

    static getChiffrePerSecteurByAppel(id, callback) {
        db.query("SELECT subquery.vocation, SUM(subquery.chiffre_d_affaire) AS total_chiffre_d_affaire FROM ( SELECT l.vocation, COUNT(s.option1 + s.principal + s.option2) AS count_sum, MIN(s.option1 + s.principal + s.option2) AS min_sum, MAX(s.option1 + s.principal + s.option2) AS max_sum, l.surface, l.surface * MAX(s.option1 + s.principal + s.option2) AS chiffre_d_affaire FROM soumission s JOIN lot l ON l.code_lot = s.lot JOIN sous_offre so ON so.id_soff = s.id_s_offre JOIN retrait_cahier_de_charge r ON r.id_retrait = so.retrait WHERE r.id_appof = ? GROUP BY l.vocation, l.surface ) AS subquery GROUP BY subquery.vocation ORDER by subquery.vocation", [id], callback);
    }

}

module.exports = Rapport;
