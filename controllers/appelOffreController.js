const AppelOffre = require('../models/AppelOffre');

exports.getAllAppelsOffre = (req, res) => {
  AppelOffre.getAllAppelsOffre((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({data:results});
    }
  });
};

exports.getAllAppelsOffre2 = (req, res) => {
  AppelOffre.getAllAppelsOffre2((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({data:results});
    }
  });
};

exports.getAppelOffreById = (req, res) => {
  const id = req.params.id;
  AppelOffre.getAppelOffreById(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Appel d\'offre not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.createAppelOffre = (req, res) => {
  const { nom, num_appel, date_creation, date_limite, id_resp } = req.body;
  const newAppelOffre = { nom, num_appel, date_creation, date_limite, id_resp };
  AppelOffre.createAppelOffre(newAppelOffre, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Appel d\'offre created', id: results.insertId });
    }
  });
};

exports.updateAppelOffre = (req, res) => {
  const id = req.params.id;
  const { nom, num_appel, date_creation, date_limite, id_resp } = req.body;
  const updatedAppelOffre = { nom, num_appel, date_creation, date_limite, id_resp };
  AppelOffre.updateAppelOffre(id, updatedAppelOffre, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Appel d\'offre not found' });
    } else {
      res.status(200).json({ message: 'Appel d\'offre updated' });
    }
  });
};

exports.deleteAppelOffre = (req, res) => {
  const id = req.params.id;
  AppelOffre.deleteAppelOffre(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Appel d\'offre not found' });
    } else {
      res.status(200).json({ message: 'Appel d\'offre deleted' });
    }
  });
};
