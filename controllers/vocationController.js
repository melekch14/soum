const Vocation = require('../models/Vocation');

exports.getAllvocations = (req, res) => {
    Vocation.getAllVocations((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({data:results});
    }
  });
};

exports.getVocationById = (req, res) => {
  const id = req.params.id;
  Vocation.getVocationById(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Vocation not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createVocation = (req, res) => {
  const { code_vocation, label } = req.body;
  const newVocation = { code_vocation, label };
  Vocation.createVocation(newVocation, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Vocation created', id: results.insertId });
    }
  });
};

exports.updateVocation = (req, res) => {
  const id = req.params.id;
  const { code_vocation, label } = req.body;
  const updatedVocation = { code_vocation, label };
  Vocation.updateVocation(id, updatedVocation, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Vocation not found' });
    } else {
      res.status(200).json({ message: 'Vocation updated' });
    }
  });
};

exports.deleteVocation = (req, res) => {
  const id = req.params.id;
  Vocation.deleteVocation(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Vocation not found' });
    } else {
      res.status(200).json({ message: 'Vocation deleted' });
    }
  });
};
