const { db } = require('../db');

class DietsMdl {
  constructor(data) {
    this.id = data.ID;
    this.name = data.Name;
    this.descripcion = data.Descripcion;
    this.active = data.Active;
  }

  static async create(obj) {
    let data;
    try {
      data = await db.create('Diets', obj);
    } catch (e) {
      throw e;
    } return data;
  }

  static async findAll() {
    let data;
    try {
      data = await db.findAll('Diets');
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async findById(dietId) {
    let data;
    try {
      console.log(dietId);
      data = await db.findById('Diets', dietId);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async update(obj, dietId) {
    console.log(obj, dietId);
    let data;
    try {
      data = await db.update('Diets', obj, dietId);
    } catch (e) {
      throw e;
    }
    return data;
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
