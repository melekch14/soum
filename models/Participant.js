const db = require('../config/db');


class Participant {
    static getAllParticipant(callback) {
      db.query('SELECT * FROM Participant', callback);
    } //affichage
  
    static getParticipantById(id, callback) {
      db.query('SELECT * FROM Participant WHERE code_participant = ?', [id], callback);
    } 
  
    static createPartcipant(data, callback) {
      db.query('INSERT INTO participant SET ?', data, callback);
    }
  
    static updateParticipant(id, data, callback) {
      db.query('UPDATE participant SET ? WHERE code_participant = ?', [data, id], callback);
    }
  
    static deleteParticipant(id, callback) {
      db.query('DELETE FROM participant WHERE code_participant = ?', [id], callback);
    }
}

module.exports = Participant;