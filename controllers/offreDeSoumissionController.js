const OffreDeSoumission = require('../models/OffreDeSoumission');

exports.getAllOffresDeSoumission = (req, res) => {
  OffreDeSoumission.getAllOffresDeSoumission((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({data:results});
    }
  });
};

exports.getOffreDeSoumissionById = (req, res) => {
  const id = req.params.id;
  OffreDeSoumission.getOffreDeSoumissionById(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Offre de soumission not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createOffreDeSoumission = (req, res) => {
  const { description, date, participant, id_appof } = req.body;
  const newOffreDeSoumission = { description, date, participant, id_appof };
  OffreDeSoumission.createOffreDeSoumission(newOffreDeSoumission, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Offre de soumission created', id: results.insertId });
    }
  });
};

exports.updateOffreDeSoumission = (req, res) => {
  const id = req.params.id;
  const { description, date, participant, id_appof } = req.body;
  const updatedOffreDeSoumission = { description, date, participant, id_appof };
  OffreDeSoumission.updateOffreDeSoumission(id, updatedOffreDeSoumission, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Offre de soumission not found' });
    } else {
      res.status(200).json({ message: 'Offre de soumission updated' });
    }
  });
};

exports.deleteOffreDeSoumission = (req, res) => {
  const id = req.params.id;
  OffreDeSoumission.deleteOffreDeSoumission(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Offre de soumission not found' });
    } else {
      res.status(200).json({ message: 'Offre de soumission deleted' });
    }
  });
};
