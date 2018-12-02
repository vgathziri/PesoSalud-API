const { db } = require('../db');
/**
 * [ServicesMdl is a class that initializes the functions and the prototype of them]]
 */
class ServicesMdl {
  constructor(data) {
    this.id = data.ID;
    this.name = data.Name;
    this.description = data.Description;
    this.price = data.Price;
    this.duration = data.Duration;
    this.active = data.Active;
  }

  /**
  * [Create is a method that connects the Services with the db]
  * @param  {Object]} req [a new objet]
  * @return {int}     [return id of created obj]
  */
  static async create(obj) {
    let data;
    try {
      data = await db.create('Services', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
   * [findAlly is a method of find all services registered]
   * @return {Object} [return a Services is that  exists]
   */
  static async findAll() {
    let data;
    try {
      data = await db.findAll('Services');
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
 * [update is a method of call update of db]
 * @param  {[Object]} req    [obj]
 * @param  {[int]}  serviceId [Id]
 * @return {Object}        [return object update if does exists]
 */
  static async update(obj, servicesId) {
    let data;
    try {
      data = await db.update('Services', obj, servicesId);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
   * [processData is a function that creates array of Services]
   * @param  {[Object]} data [ServicesMdl]
   * @return {[array]}      [returns array of Services]
   */
  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new ServicesMdl(d));
    });
    return array;
  }
}

module.exports = ServicesMdl;
