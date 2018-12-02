const { db } = require('../db');
/**
 * [PromotionsMdl contains the body of the object and the attributes of the DB for its connection]
 */
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
 * @param  {[Object]}  obj [The "obj" is a new object body promotion]
 * @return {Promise}     [Try to add and conect the new object in the table "Promotions"]
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
 * @return {Promise} [ Fuction for tour and Find All the intances in the table "Promotions"]
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
 * @param  {[Object]}  UserId [Attribute foreigh in the table, and value of reference its a int ]
 * @return {Promise}        [find data by IDs are register in the table]
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
   * @param  {[Obeject]}  obj [Receive the object of the class for changes ]
   * @param  {[Obejct]}  id  [Its a integer, key value , identificador of every object]
   * @return {Promise}     [Change the data register modified successful]
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
 * @param  {[Object]} data [Attribute for tour the register in table promotions ]
 * @return {[Array]}      [Its an array that contain the register tour previusly]
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
