// const mysql = require('mysql');
//
// const CircularJSON = require('circular-json');
//
// class DB {
//   constructor() {
//     this.connection = mysql.createConnection({
//       host: process.env.DB_HOST,
//       database: process.env.DB_NAME,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//     });
//     this.connection.connect();
//   }
//
//   findAll(table) {
//     return this.connection.query(`SELECT * FROM ${table}`, (err, rows) => {
//       if (err) throw err;
//       return CircularJSON.stringify(rows);
//     });
//   }
//
//   findById(table, userId) {
//     let sql    = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);
//     return this.connection.query(sql, (err, rows) => {
//       if (err) throw err;
//       return (rows);
//     });
//   }
//
//   processResults(data) {
//     return CircularJSON.stringify(data);
//   }
// }
//
// // this.connection.end();
//
// exports.db = new DB();
