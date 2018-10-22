const { db } = require('../db');

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
 * @param  {[type]}  obj [The "obj" is a new Appointment]
 * @return {Promise}     [Try to conect the object in the table  "Appointment"]
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
 * @param  {[type]}  date [Attribute the table]
 * @return {Promise}      [Function to throw affter catch]
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
* @param  {[type]}  UserId [Attribute foreigh in the table, and value of reference its a int ]
* @return {Promise}        [Try to get all the IDs are register in the table]
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
 * @param  {[type]}  placeID [Attribute foreigh in the table, and value of reference its a int ]
 * @return {Promise}         [Try to get all the IDs places are register in the table]
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
   * @param  {[type]}  obj [recibe the object of the class]
   * @param  {[type]}  id  [its a integer, key value , identificador of every object]
   * @return {Promise}     [Try to change the data register modified]
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
 * @param  {[type]} data [Atrribute for tour the register ]
 * @return {[type]}      [Its a array that contain the register tour previusly]
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
