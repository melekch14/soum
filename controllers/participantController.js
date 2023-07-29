// controllers/ParticipanttController.js
const Participant = require('../models/Participant');

exports.getAllParticipant = (req, res) => {
  Participant.getAllParticipant((err, results) => {         //req=vue , res=vue
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' }); //500:code erreur ,404:page note found,200:demande shyhaa ,2001:
    } else {
      res.status(200).send({data:results});
    }
  });
};

exports.getParticipantById = (req, res) => {
  const id = req.params.id;
  Participant.getParticipantById(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Participant not found' });
    } else {
      res.status(200).json(results[0]); //resul=tableau
    }
  });
};

exports.createPartcipant = (req, res) => {
  const  {code_participant, nom} = req.body;
  const newParticipant = {code_participant, nom};
  Participant.createPartcipant(newParticipant, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Participant created' });
    }
  });
};

exports.updateParticipant = (req, res) => {
  const id = req.params.id;
  const  {code_participant, nom} = req.body;
  const updateParticipant =  {code_participant, nom};
  Participant.updateParticipant(id, updateParticipant, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Participant not found' });
    } else {
      res.status(200).json({ message: 'Participant updated' });
    }
  });
};

exports.deleteParticipant = (req, res) => {
  const id = req.params.id;
  Participant.deleteParticipant(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Participant not found' });
    } else {
      res.status(200).json({ message: 'Participant deleted' });
    }
  });
};
