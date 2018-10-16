const { db } = require('../db');

// FIXME Todos los metodos deben estar documentados

class AppointmentMdl {
  constructor(data) {
    this.id = data.ID;
    this.userID = data.UserID;
    this.date = data.Date;
    this.serviceID = data.ServiceID;
    this.status = data.Status;
    this.placeID = data.PlaceID;
  }

  static async create(obj) {
    let data;
    try {
      data = await db.create('Appointment', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static async findByDate(date) {
    let data;
    try {
      data = await db.findByAttribute('Appointment', 'Date', date);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async findByUserID(userID) {
    let data;
    try {
      data = await db.findByAttribute('Appointment', 'UserID', userID);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async findByPlaceID(placeID) {
    let data;
    try {
      data = await db.findByAttribute('Appointment', 'PlaceID', placeID);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async update(obj, appId) {
    let data;
    try {
      data = await db.update('Appointment', obj, appId);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new AppointmentMdl(d));
    });
    return array;
  }
}

module.exports = AppointmentMdl;
