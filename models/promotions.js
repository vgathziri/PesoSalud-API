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

  create() {
    return new Promise((resolve, reject) => {
      db.create('Promotions', this)
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
      array.push(new PromotionsMdl(d));
    });
    return array;
  }
}

module.exports = PromotionsMdl;
