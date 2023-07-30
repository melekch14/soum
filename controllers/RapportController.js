const rapport = require('../models/Rapport');

exports.getStatByAppel = (req, res) => {
    const id = req.params.id;
    rapport.getStatByAppel(id, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'Appel d\'offre not found' });
      } else {
        res.status(200).json(results);
      }
    });
  };

  exports.getOffreByAppel = (req, res) => {
    const id = req.params.id;
    rapport.getOffreByAppel(id, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'Appel d\'offre not found' });
      } else {
        res.status(200).json(results);
      }
    });
  };

  exports.getStatPerSecteurByAppel = (req, res) => {
    const id = req.params.id;
    rapport.getStatPerSecteurByAppel(id, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'Appel d\'offre not found' });
      } else {
        res.status(200).json(results);
      }
    });
  };

  exports.getChiffrePerSecteurByAppel = (req, res) => {
    const id = req.params.id;
    rapport.getChiffrePerSecteurByAppel(id, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'Appel d\'offre not found' });
      } else {
        res.status(200).json(results);
      }
    });
  };