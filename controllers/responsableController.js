const Responsable = require('../models/Responsble');

exports.getAllResponsables = (req, res) => {
  Responsable.getAllResponsables((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getResponsableById = (req, res) => {
  const id = req.params.id;
  Responsable.getResponsableById(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Responsable not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createResponsable = (req, res) => {
  const { nom } = req.body;
  const newResponsable = { nom };
  Responsable.createResponsable(newResponsable, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Responsable created', id: results.insertId });
    }
  });
};

exports.updateResponsable = (req, res) => {
  const id = req.params.id;
  const { nom } = req.body;
  const updatedResponsable = { nom };
  Responsable.updateResponsable(id, updatedResponsable, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Responsable not found' });
    } else {
      res.status(200).json({ message: 'Responsable updated' });
    }
  });
};

exports.deleteResponsable = (req, res) => {
  const id = req.params.id;
  Responsable.deleteResponsable(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Responsable not found' });
    } else {
      res.status(200).json({ message: 'Responsable deleted' });
    }
  });
};
