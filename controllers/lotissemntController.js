// controllers/lotissemntController.js
const Lotissemnt = require('../models/Lotissemnt');

exports.getAllLotissemnts = (req, res) => {
  Lotissemnt.getAllLotissemnts((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({data:results});
    }
  });
};

exports.getAllLotissemntsByRetrait = (req, res) => {
  const id = req.params.id;
  Lotissemnt.getAllLotissemntsByRetrait(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({data:results});
    }
  });
};

exports.getLotissemntById = (req, res) => {
  const id = req.params.id;
  Lotissemnt.getLotissemntById(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Lotissemnt not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createLotissemnt = (req, res) => {
  const { code_lotissement, nom, description, location } = req.body;
  const newLotissemnt = { code_lotissement, nom, description, location };
  Lotissemnt.createLotissemnt(newLotissemnt, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Lotissemnt created', id: results.insertId });
    }
  });
};

exports.updateLotissemnt = (req, res) => {
  const id = req.params.id;
  const { code_lotissement, nom, description, location } = req.body;
  const updatedLotissemnt = { code_lotissement, nom, description, location };
  Lotissemnt.updateLotissemnt(id, updatedLotissemnt, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Lotissemnt not found' });
    } else {
      res.status(200).json({ message: 'Lotissemnt updated' });
    }
  });
};

exports.deleteLotissemnt = (req, res) => {
  const id = req.params.id;
  Lotissemnt.deleteLotissemnt(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Lotissemnt not found' });
    } else {
      res.status(200).json({ message: 'Lotissemnt deleted' });
    }
  });
};
