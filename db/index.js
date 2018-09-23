const mysql = require('mysql');

class DB {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });
    this.connection.connect();
  }

  queryGet(table) {
    return this.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;
      return (rows);
    });
  }
}

// this.connection.end();

exports.db = new DB();
