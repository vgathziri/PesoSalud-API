const { db } = require('../db');

class AppointmetMdl {
  constructor(data) {
    this.id = data.ID;
    this.userID = data.UserID;
    this.date = data.Date;
    this.serviceID = data.ServiceID;
    this.status = data.Status;
    this.placeID = data.PlaceID;
  }

  create() {
    return new Promise((resolve, reject) => {
      db.create('Appointment', this)
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
      array.push(new AppointmetMdl(d));
    });
    return array;
  }
}

module.exports = AppointmetMdl;
