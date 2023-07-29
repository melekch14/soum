const SousOffre = require('../models/SousOffre');

exports.getAllSousOffres = (req, res) => {
  SousOffre.getAllSousOffres((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getAllSousOffresByRetrait = (req, res) => {
  const id = req.params.id;
  SousOffre.getAllSousOffresByRetrait(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getSousOffreById = (req, res) => {
  const id = req.params.id;
  SousOffre.getSousOffreById(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Sous-offre not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createSousOffre = (req, res) => {
  const { retrait, titre } = req.body;
  const newSousOffre = { retrait, titre };
  SousOffre.createSousOffre(newSousOffre, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Sous-offre created', id: results.insertId });
    }
  });
};

exports.updateSousOffre = (req, res) => {
  const id = req.params.id;
  const { retrait, titre } = req.body;
  const updatedSousOffre = { retrait, titre };
  SousOffre.updateSousOffre(id, updatedSousOffre, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Sous-offre not found' });
    } else {
      res.status(200).json({ message: 'Sous-offre updated' });
    }
  });
};

exports.deleteSousOffre = (req, res) => {
  const id = req.params.id;
  SousOffre.deleteSousOffre(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Sous-offre not found' });
    } else {
      res.status(200).json({ message: 'Sous-offre deleted' });
    }
  });
};
