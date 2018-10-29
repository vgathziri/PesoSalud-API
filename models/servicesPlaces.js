const { db } = require('../db');

class ServicesPlacesMdl {
  constructor(data) {
    this.servicesid = data.ServicesID;
    this.placeid = data.PlaceID;
  }

  /**
  * [Create is a method that connects the ServicesPlaces with the db]
  * @param  {Object]} req [a new objet]
  * @return {int}     [return id of created obj]
  */
  static async create(obj) {
    let data;
    try {
      data = await db.create('Services_Places', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
   * [findByService is a method of find service in specific]
   * @return {Object} [return a service is that  exists]
   */
  static async findByService(servicesid) {
    let data;
    try {
      data = await db.findByAttribute('Services_Places', 'ServicesID', servicesid);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
   * [findByPLace is a method of find place in specific]
   * @return {Object} [return a place is that  exists]
   */
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
