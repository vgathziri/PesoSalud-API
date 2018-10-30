const mysql = require('mysql');

const CircularJSON = require('circular-json');
/**
 * [DB is a class of data base]
 */
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

  /**
 * [findAll is a function that gets all the tuples of a table]
 * @param  {[]} table [table in specific]
 * @return {[Function]}       [returns an error if exists an error or a function processResults]
 */
  findAll(table) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM ??', [table], (err, rows) => {
        if (err) return reject(err);
        return resolve(this.processResults(rows));
      });
    });
  }

  /**
   * [findById is a function that gets the tuples of a table by id]
   * @param  {[type]} table  [table in specific]
   * @param  {[int]} userId [userId]
   * @return {[Function]}       [returns an error if exists an error or a function processResults]
   */
  findById(table, userId) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM ?? WHERE id = ?', [table, userId], (err, rows) => {
        if (err) return reject(err);
        return resolve(this.processResults(rows));
      });
    });
  }

  /**
   * [findByAttribute is a function that gets the tuples of a table by attribute]
   * @param  {[table]} table     [table in specific]
   * @param  {[Object]} data  [attributes of object]
   * @return {[type]}           [returns an error if exists an error or a function processResults]]
   */
  findByAttribute(table, attribute, value) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM ?? WHERE ?? = ?', [table, attribute, value], (err, rows) => {
        if (err) return reject(err);
        return resolve(this.processResults(rows));
      });
    });
  }

  /**
   * [create is a function that create a new tuples in a table]
   * @param  {[table]} table     [table in specific]
   * @param  {[Object]} data  [attributes of object]
   * @return {[Function]}       [returns a function processError if exists an error
   * or a function processResults]]
   */
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

  /**
   * [update is a function that edit a tuple of specific table]
   * @param  {[]} table  [specific table]
   * @param  {[Object]} data  [attributes of object]
   * @param  {[int]} userId [Id of tuple]
   * @return {[Function]}       [returns a function processError if exists an error
   * or a function that modifies the changed values]
   */
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

  /**
 * [updateToken description]
 * @param  {[type]} data  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
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

  /**
   * [findTokenActive description]
   * @param  {[type]} table  [description]
   * @param  {[type]} userId [description]
   * @return {[type]}        [description]
   */
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

  /**
   * [findWithFilters description]
   * @param  {[type]} table   [description]
   * @param  {[type]} filters [description]
   * @return {[type]}         [description]
   */
  findWithFilters(table, filters) {
    let filter = '';
    for(let field in filters) {
      filter += `${field} = '${filters[field]}' AND `;
    }

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

  /**
   * [destroy is a function to destroy db]
   * @return {[Function]} [returns destroy function]
   */
  destroy() {
    this.connection.destroy();
  }

  /**
 * [processResults description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
  processResults(data) {
    return JSON.parse(CircularJSON.stringify(data));
  }

  /**
   * [processError description]
   * @param  {[type]} err [description]
   * @return {[type]}     [description]
   */
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
      case 'ER_PARSE_ERROR':
        error[''] = {
          error: err.sqlMessage,
          sql: err.sql,
        };
        break;
      default:
    }
    return error;
  }

  /**
   * [getDataFromErrorMsg description]
   * @param  {[type]} message [description]
   * @return {[type]}         [description]
   */
  static getDataFromErrorMsg(message) {
    const data = unescape(message).match(/'([^']+)'/g);
    return {
      field: data[1].slice(1, -1),
      data: data[0].slice(1, -1),
    };
  }
}

exports.db = new DB();
