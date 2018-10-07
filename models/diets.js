const { db } = require('../db');

class DietsMdl {
  constructor(data) {
    this.id = data.ID;
    this.name = data.Name;
    this.descripcion = data.Description;
  }

  create() {
    return new Promise((resolve, reject) => {
      db.create('Diets', this)
        .then(res => resolve(this.processData(res)))
        .catch(err => reject(err));
    });
  }

  static findAll(table) {
    return new Promise((resolve, reject) => {
      db.findAll(table)
        .then(res => resolve(this.processData(res)))
        .catch(err => reject(err));
    });
  }

  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new DietsMdl(d));
    });
    return array;
  }
}

module.exports = DietsMdl;
