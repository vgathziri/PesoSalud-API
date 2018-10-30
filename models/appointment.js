const { db } = require('../db');
/**
 * [AppointmentMdl contains the body of the object and the attributes of the DB for its connection ]
 */
class AppointmentMdl {
  constructor(data) {
    this.id = data.ID;
    this.userID = data.UserID;
    this.date = data.Date;
    this.serviceID = data.ServiceID;
    this.status = data.Status;
    this.placeID = data.PlaceID;
  }

  /**
 * [create  is a function for add a new instance in the table(database]
 * @param  {[Object]}  obj [Add New object in table with body form]
 * @return {Promise}     [Try to conect the data of the object in the table  "Appointment"]
 */
  static async create(obj) {
    let data;
    try {
      data = await db.create('Appointment', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
 * [findByDate Its a funcion try to search and show the Appointment register per date]
 * @param  {[object]}  date [Body date"Attribute the table]
 * @return {Promise}      [Function to throw error affter catch]
 */
  static async findByDate(date) {
    let data;
    try {
      data = await db.findByAttribute('Appointment', 'Date', date);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
* [Its a funcion try to search and show the Appointment register per id of user]
* @param  {[Obejct]}  UserId [Body.Id interger, key Attribute foreigh in the table ]
* @return {Promise}        [Function for tour ans search data UserId register in database]
*/
  static async findByUserID(userID) {
    let data;
    try {
      data = await db.findByAttribute('Appointment', 'UserID', userID);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
 * [findByPlaceID Its a funcion try to search and show the Appointment register per id of place]
 * @param  {[Obejct]}  placeID [Key interget Attribute foreigh in the table to find]
 * @return {Promise}         [Function for tour ans search data register place  in database]
 */
  static async findByPlaceID(placeID) {
    let data;
    try {
      data = await db.findByAttribute('Appointment', 'PlaceID', placeID);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
   * [update is a funtion that modify data in the objeto previusly create]
   * @param  {[Object]}  obj [recive the object of the class with changes to modify]
   * @param  {[Obejct]}  id  [Bodi.Id its a integer, key value , identificador of every object]
   * @return {Promise}     [Try to change the new data register modified]
   */
  static async update(obj, appId) {
    let data;
    try {
      data = await db.update('Appointment', obj, appId);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
 * [processData is a funcion for tour registers and show all]
 * @param  {[Object]} data [Atrribute for tour the register in table Appointment ]
 * @return {[Array]}      [Its a array that contain the register tour previusly]
 */
  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new AppointmentMdl(d));
    });
    return array;
  }
}

module.exports = AppointmentMdl;
