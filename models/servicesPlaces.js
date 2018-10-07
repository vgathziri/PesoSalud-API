const { db } = require('../db');

class ServicesPlacesMdl {
  constructor(data) {
    this.servicesid = data.ServicesID;
    this.placeid = data.PlaceID;
  }

  create() {
    return new Promise((resolve, reject) => {
      db.create('ServicesPlaces', this)
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
      array.push(new ServicesPlacesMdl(d));
    });
    return array;
  }
}

module.exports = ServicesPlacesMdl;
