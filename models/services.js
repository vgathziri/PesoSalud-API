const { db } = require('../db');

class ServicesMdl {
  constructor(data) {
    this.id = data.ID;
    this.name = data.Name;
    this.description = data.Description;
    this.price = data.Price;
    this.duration = data.Duration;
  }

  create() {
    return new Promise((resolve, reject) => {
      db.create('Services', this)
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
      array.push(new ServicesMdl(d));
    });
    return array;
  }
}

module.exports = ServicesMdl;
