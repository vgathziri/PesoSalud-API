const { db } = require('../db');
/**
 * [PlaceMdl contains the body of the object and the attributes of the DB for its connection]
 */
class PlaceMdl {
  constructor(data) {
    this.id = data.ID;
    this.name = data.Name;
    this.placeType = data.PlaceType;
    this.active = data.Active;
  }

  /**
 * [create Fuction for add new instance in the table (database)]
 * @param  {[Object]}  obj [New instance in database that Place- to assing Atrributes ]
 * @return {Promise}     [ Connet for add the new object Place in table]
 */
  static async create(obj) {
    let data;
    try {
      data = await db.create('Places', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
 * [findAll Fuction to find all registers in database and show to client]
 * @return {Promise} [fuction processData for show and tour all registers ]
 */
  static async findAll() {
    let data;
    try {
      data = await db.findAll('Places');
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
 * [edit fuction to change or updated registers in database ]
 * @param  {[Object]}  obj [It´s instance especific for change by key value id]
 * @param  {[Object]}  id  [Interget Attribute key with value identifier in the database]
 * @return {Promise}     [Updated object in database with new changes ]
 */
  static async edit(obj, id) {
    let data;
    try {
      data = await db.update('Places', obj, id);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
 * [processData Fuction for tour register in database and show all]
 * @param  {[Object]} data [Attribute for tour the register and find it]
 * @return {[Array]}      [It´s an array that contain the registers tour previusly]
 */
  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new PlaceMdl(d));
    });
    return array;
  }
}

module.exports = PlaceMdl;
