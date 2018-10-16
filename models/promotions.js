const { db } = require('../db');

// FIXME Todos los metodos deben estar documentados

class PromotionsMdl {
  constructor(data) {
    this.id = data.ID;
    this.userId = data.UserID;
    this.serviceID = data.ServiceID;
    this.date = data.Date;
    this.quantityBought = data.QuantityBought;
    this.quantityiUsed = data.QuantityUsed;
  }

  static async create(obj) {
    let data;
    try {
      data = await db.create('Promotions', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static async findAllPromotions() {
    let data;
    try {
      data = await db.findAll('Promotions');
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async findByUserID(UserId) {
    let data;
    try {
      data = await db.findByAttribute('Promotions', 'UserID', UserId);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static async update(obj, id) {
    let data;
    try {
      console.log(obj, id);
      data = await db.update('Promotions', obj, id);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new PromotionsMdl(d));
    });
    return array;
  }
}

module.exports = PromotionsMdl;
