const { db } = require('../db');

class PromotionsMdl {
  constructor(data) {
    this.id = data.ID;
    this.userId = data.UserID;
    this.serviceID = data.ServiceID;
    this.date = data.Date;
    this.quantityBought = data.QuantityBought;
    this.quantityiUsed = data.QuantityUsed;
  }

  /**
 * [create is a function for add a new instance in the table(database)]
 * @param  {[type]}  obj [The "obj" is a new promotion]
 * @return {Promise}     [Try to conect the object in the table "Promotions"]
 */
  static async create(obj) {
    let data;
    try {
      data = await db.create('Promotions', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
 * [Its a funcion for show all the promotions are register in the table(database)]
 * @return {Promise} [Try to find the intances in the table "Promotions"]
 */
  static async findAllPromotions() {
    let data;
    try {
      data = await db.findAll('Promotions');
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
 * [Its a funcion try to search and show the promotions register per id of user]
 * @param  {[type]}  UserId [Attribute foreigh in the table, and value of reference its a int ]
 * @return {Promise}        [Try to get all the IDs are register in the table]
 */
  static async findByUserID(UserId) {
    let data;
    try {
      data = await db.findByAttribute('Promotions', 'UserID', UserId);
    } catch (e) {
      throw e;
    }
    return data;
  }
  /**
   * ["update" is a funtion that modify data in the objeto previusly create]
   * @param  {[type]}  obj [Receive the object of the class]
   * @param  {[type]}  id  [Its a integer, key value , identificador of every object]
   * @return {Promise}     [Try to change the data register modified]
   */

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

  /**
 * [processData is a funcion for tour registers and show all]
 * @param  {[type]} data [Attribute for tour the register ]
 * @return {[type]}      [Its an array that contain the register tour previusly]
 */
  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new PromotionsMdl(d));
    });
    return array;
  }
}

module.exports = PromotionsMdl;
