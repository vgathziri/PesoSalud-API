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
      this.connection.query('SELECT * FROM ??', [table], (err, rows) => {
        if (err) return reject(err);
        return resolve(this.processResults(rows));
      });
    });
  }

  findById(table, userId) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM ?? WHERE id = ?', [table, userId], (err, rows) => {
        if (err) return reject(err);
        return resolve(this.processResults(rows));
      });
    });
  }

  findByAttribute(table, attribute, value) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM ?? WHERE ?? = ?', [table, attribute, value], (err, rows) => {
        if (err) return reject(err);
        return resolve(this.processResults(rows));
      });
    });
  }

  create(table, data) {
    return new Promise((resolve, reject) => {
      this.connection.query('INSERT INTO ?? SET ?', [table, data], (err, results) => {
        if (err) {
          return reject(this.processError(err));
        }
        return resolve(results.insertId);
      });
    });
  }

  update(table, data, userId) {
    return new Promise((resolve, reject) => {
      this.connection.query('UPDATE ?? SET ? WHERE id = ?', [table, data, userId], (err, results) => {
        if (err) {
          return reject(this.processError(err));
        }
        return resolve(results.changedRows);
      });
    });
  }

  updateToken(data, value) {
    return new Promise((resolve, reject) => {
      this.connection.query('UPDATE Tokens SET ? WHERE token = ?', [data, value], (err, results) => {
        if (err) {
          return reject(this.processError(err));
        }
        return resolve(results.changedRows);
      });
    });
  }

  findTokenActive(table, userId) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM ?? WHERE id = ? AND active = 1 ORDER BY created_at DESC LIMIT 1', [table, userId], (err, rows) => {
        if (err) {
          return reject(this.processError(err));
        }
        return resolve(this.processResults(rows));
      });
    });
  }

  findPermission(method, route) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM Permission WHERE Method = ? AND Route = ?', [method, route], (err, rows) => {
        if (err) {
          return reject(this.processError(err));
        }
        return resolve(this.processResults(rows));
      });
    });
  }

  findWithFilters(table, filters) {
    let filter = '';
    for(let field in filters) {
      filter += `${field} = '${filters[field]}' AND `;
    };

    filter = filter.substr(0, filter.length - 4);

    const query = `SELECT * FROM ${table} WHERE ${filter};`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, rows) => {
        if (err) {
          return reject(this.processError(err));
        }
        return resolve(this.processResults(rows));
      });
    });
  }

  disconnect() {
    this.connection.end();
  }

  destroy() {
    this.connection.destroy();
  }

  processResults(data) {
    return JSON.parse(CircularJSON.stringify(data));
  }

  processError(err) {
    const error = {};

    switch (err.code) {
      case 'ER_DUP_ENTRY':
        let data = this.getDataFromErrorMsg(err.sqlMessage);
        error['duplicated'] = {
          message: `The ${data.field} ${data.data} already exists on the system`,
          field: data.field,
          sql: err.sql,
        };
        break;
      default:
    }
    return error;
  }

  static getDataFromErrorMsg(message) {
    const data = unescape(message).match(/'([^']+)'/g);
    return {
      field: data[1].slice(1, -1),
      data: data[0].slice(1, -1),
    };
  }
}

exports.db = new DB();
