// controllers/ParticipanttController.js
const AppelLotissement = require('../models/AppelLotissement');

exports.getAllAppelLotissement = (req, res) => {
    AppelLotissement.getAllAppelLotissement((err, results) => {         //req=vue , res=vue
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' }); //500:code erreur ,404:page note found,200:demande shyhaa ,2001:
    } else {
      res.status(200).json({data:results});
    }
  });
};

exports.getAllAppelLotissementByAppel = (req, res) => {
  const id = req.params.id;
  AppelLotissement.getAllAppelLotissementByAppel(id, (err, results) => {         //req=vue , res=vue
  if (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' }); //500:code erreur ,404:page note found,200:demande shyhaa ,2001:
  } else {
    res.status(200).json({data:results});
  }
});
};

exports.getAppelLotissementById = (req, res) => {
  const id = req.params.id;
  AppelLotissement.getAppelLotissementById(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'AppelLotissement not found' });
    } else {
      res.status(200).json(results[0]); //resul=tableau
    }
  });
};

exports.createAppelLotissement = (req, res) => {
  const  {id_appel, lotissement} = req.body;
  const newAppelLotissement = {id_appel, lotissement};
  AppelLotissement.createAppelLotissement(newAppelLotissement, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'AppelLotissement created' });
    }
  });
};

exports.updateAppelLotissement = (req, res) => {
  const id = req.params.id;
  const  {id_appel, lotissement} = req.body;
  const updateAppelLotissement =  {id_appel, lotissement};
  AppelLotissement.updateAppelLotissement(id, updateAppelLotissement, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'AppelLotissement not found' });
    } else {
      res.status(200).json({ message: 'AppelLotissement updated' });
    }
  });
};

exports.deleteAppelLotissement = (req, res) => {
  const id = req.params.id;
  AppelLotissement.deleteAppelLotissement(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'AppelLotissement not found' });
    } else {
      res.status(200).json({ message: 'AppelLotissement deleted' });
    }
  });
};
