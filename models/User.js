// models/User.js
const connection = require('../config/db');

class User {
  static findByUsername(username, callback) {
    connection.query('SELECT * FROM responsable WHERE username = ?', [username], (error, results) => {
      if (error) throw error;
      callback(results[0]);
    });
  }

  static createUser(username, password, callback) {
    connection.query(
      'INSERT INTO responsable (username, password) VALUES (?, ?)',
      [username, password],
      (error, results) => {
        if (error) throw error;
        callback(results.insertId);
      }
    );
  }
}

module.exports = User;
