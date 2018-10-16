const { db } = require('../db');

// FIXME Todos los metodos deben estar documentados

class PlaceMdl {
  constructor(data) {
    this.id = data.ID;
    this.name = data.Name;
    this.placeType = data.PlaceType;
    this.active = data.Active;
  }

  static async create(obj) {
    let data;
    try {
      data = await db.create('Places', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static async findAll() {
    let data;
    try {
      data = await db.findAll('Places');
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async edit(obj, id) {
    let data;
    try {
      data = await db.update('Places', obj, id);
    } catch (e) {
      throw e;
    }
    return data;
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
