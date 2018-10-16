const { db } = require('../db');

// FIXME Todos los metodos deben estar documentados

class ServicesMdl {
  constructor(data) {
    this.id = data.ID;
    this.name = data.Name;
    this.description = data.Description;
    this.price = data.Price;
    this.duration = data.Duration;
    this.active = data.Active;
  }

  static async create(obj) {
    let data;
    try {
      data = await db.create('Services', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static async findAll() {
    let data;
    try {
      data = await db.findAll('Services');
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async update(obj, servicesId) {
    let data;
    try {
      data = await db.update('Services', obj, servicesId);
    } catch (e) {
      throw e;
    }
    return data;
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
