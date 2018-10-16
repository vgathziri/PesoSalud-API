const { db } = require('../db');

// FIXME Todos los metodos deben estar documentados

class ServicesPlacesMdl {
  constructor(data) {
    this.servicesid = data.ServicesID;
    this.placeid = data.PlaceID;
  }

  static async create(obj) {
    let data;
    try {
      data = await db.create('Services_Places', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static async findByService(servicesid) {
    let data;
    try {
      data = await db.findByAttribute('Services_Places', 'ServicesID', servicesid);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async findByPlace(placeid) {
    let data;
    try {
      data = await db.findByAttribute('Services_Places', 'PlaceID', placeid);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
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
