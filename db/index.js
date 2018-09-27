const mysql = require('mysql');

const CircularJSON = require('circular-json');

class DB {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    this.connection.connect();
  }

  findAll(table) {
    return new Promise((resolve, reject) => {
      return this.connection.query(`SELECT * FROM ${table}`, (err, rows) => {
        if (err) return reject(err);
        let lala = this.processResults(rows);
        // console.log('lala', lala);
        return resolve(lala);
        // return resolve(rows);
      });
    });
  }

  findById(table, userId) {
    const sql = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);
    return this.connection.query(sql, (err, rows) => {
      if (err) throw err;
      return (rows);
    });
  }

  processResults(data) {
    return JSON.parse(CircularJSON.stringify(data));
  }
}

// this.connection.end();

exports.db = new DB();
