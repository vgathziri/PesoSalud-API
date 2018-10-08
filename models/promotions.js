const { db } = require('../db');

class PromotionsMdl {
  constructor(data) {
    this.id = data.ID;
    this.userId = data.UserId;
    this.serviceID = data.ServiceID;
    this.date = data.Date;
    this.quantityBought = data.QuantityBought;
    this.quantityiUsed = data.QuantityUsed;
    this.active = data.Active;
  }

  static async createPromotion(obj) {
    let data;
    try {
      data = await db.create('Promotions', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static async findAll(table) {
    let data;
    try {
      data = await db.findAll(table);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async getPromotionbyUser(UserId) {
    let data;
    try {
      data = await db.findByAttribute('Promotions', 'UserID', UserId);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static async editPromotion(obj, ID) {
    let data;
    try {
      data = await db.update('Promotions', obj, ID);
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
