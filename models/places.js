const { db } = require('../db');

class PlaceMdl {
  constructor(data) {
    this.id = data.ID;
    this.name = data.Name;
    this.placeType = data.PlaceType;
    this.active = data.Active;
  }

  create() {
    return new Promise((resolve, reject) => {
      db.create('Places', this)
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
      array.push(new PlaceMdl(d));
    });
    return array;
  }
}

module.exports = PlaceMdl;
