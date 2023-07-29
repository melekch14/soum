const ResultatSoumission = require('../models/ResultatSoumission');

exports.getAllResultatsSoumission = (req, res) => {
  ResultatSoumission.getAllResultatsSoumission((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getResultatSoumissionById = (req, res) => {
  const id = req.params.id;
  ResultatSoumission.getResultatSoumissionById(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'ResultatSoumission not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createResultatSoumission = (req, res) => {
  const { nbr_soumission, prix_moyen_soumis, meilleur_offre, ca, id_lot } = req.body;
  const newResultatSoumission = { nbr_soumission, prix_moyen_soumis, meilleur_offre, ca, id_lot };
  ResultatSoumission.createResultatSoumission(newResultatSoumission, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'ResultatSoumission created', id: results.insertId });
    }
  });
};

exports.updateResultatSoumission = (req, res) => {
  const id = req.params.id;
  const { nbr_soumission, prix_moyen_soumis, meilleur_offre, ca, id_lot } = req.body;
  const updatedResultatSoumission = { nbr_soumission, prix_moyen_soumis, meilleur_offre, ca, id_lot };
  ResultatSoumission.updateResultatSoumission(id, updatedResultatSoumission, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'ResultatSoumission not found' });
    } else {
      res.status(200).json({ message: 'ResultatSoumission updated' });
    }
  });
};

exports.deleteResultatSoumission = (req, res) => {
  const id = req.params.id;
  ResultatSoumission.deleteResultatSoumission(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'ResultatSoumission not found' });
    } else {
      res.status(200).json({ message: 'ResultatSoumission deleted' });
    }
  });
};
