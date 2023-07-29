const Soumission = require('../models/Soumission');

exports.getAllSoumissions = (req, res) => {
  Soumission.getAllSoumissions((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getAllSoumissionsByOffre = (req, res) => {
  const id = req.params.id;
  Soumission.getAllSoumissionsByOffre(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getSoumissionById = (req, res) => {
  const id = req.params.id;
  Soumission.getSoumissionById(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Soumission not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createSoumission = (req, res) => {
  const { option1, option2, principal, id_s_offre, lot } = req.body;
  const newSoumission = { option1, option2, principal, id_s_offre, lot };
  Soumission.createSoumission(newSoumission, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Soumission created', id: results.insertId });
    }
  });
};

exports.updateSoumission = (req, res) => {
  const id = req.params.id;
  const { option1, option2, principal, id_s_offre, lot } = req.body;
  const updatedSoumission = { option1, option2, principal, id_s_offre, lot };
  Soumission.updateSoumission(id, updatedSoumission, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Soumission not found' });
    } else {
      res.status(200).json({ message: 'Soumission updated' });
    }
  });
};

exports.deleteSoumission = (req, res) => {
  const id = req.params.id;
  Soumission.deleteSoumission(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Soumission not found' });
    } else {
      res.status(200).json({ message: 'Soumission deleted' });
    }
  });
};
