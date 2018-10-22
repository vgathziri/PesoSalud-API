const appointmentMdl = require('../models/appointment');

class AppointmentCtrl {
  constructor() {
    //
    this.getByDate = this.constructor.getByDate.bind(this);
    this.getByUserID = this.constructor.getByUserID.bind(this);
    this.getByPlaceID = this.constructor.getByPlaceID.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
  }

  /**
 * [getByDate Funtion to filter appoinments per Date]
 * @param  {[type]}   req  [client´s request]
 * @param  {[type]}   res  [response that status to the fuction]
 * @param  {Function} next [The function nerby or next funcio]
 * @return {Promise}       [Return a next function ]
 */

  static async getByDate(req, res, next) {
    try {
      console.log(req.params);
      const data = await appointmentMdl.findByDate(req.params.date);
      // In case the appoinment doesn´t coincidental
      if (data.length === 0) {
        res.status(400).send({ message: 'Date not found' });
        return;
      }
      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  /**
   * [getByUserID  Funtion to filter appoinments per id of user]
   * @param  {[type]}   req  [client´s request]
   * @param  {[type]}   res  [response that status to the fuction]
   * @param  {Function} next [The function nerby or next funcion]
   * @return {Promise}       [Return a next function]
   */
  static async getByUserID(req, res, next) {
    try {
      const data = await appointmentMdl.findByUserID(req.params.userID);
      // In case User ID was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'User  not found' });
        return;
      }
      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  /**
   * [getByPlaceID Funtion to filter appoinments per id of place]
   * @param  {[type]}   req  [client´s request]
   * @param  {[type]}   res  [response that status to the fuction]
   * @param  {Function} next [The function nerby or next funcion]
   * @return {Promise}       [Return a next function ]
   */
  static async getByPlaceID(req, res, next) {
    try {
      const data = await appointmentMdl.findByPlaceID(req.params.placeID);
      // In case Place was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'Place not found' });
        return;
      }
      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  /**
   * [create dd a new object Appointment]
   * @param  {[type]}   req  [client´s request for create a new object, id identicador]
   * @param  {[type]}   res  [response that status to the fuction]
   * @param  {Function} next [Continuos to the next fuction for create]
   * @return {Promise}       [The method to the next fuction]
   */
  static async create(req, res, next) {
    try {
      const data = await appointmentMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }
  /**
 * [ Funtion to Modify data in a object previusly created ]
 * @param  {[int]}    req  [id, identicador the appoinment client´s request]
 * @param  {[type]}   res  [reponse the status of the function 200 its successful]
 * @param  {Function} next [ The next funtion ]
 * @return {Promise}       [Excute the  Next function]
 */

  static async edit(req, res, next) {
    try {
      console.log(req.params);
      const data = await appointmentMdl.update(req.body, req.params.id);

      if (data.length === 0) {
        res.status(400).send({ message: 'Appointment could not be aupdate' });
        return;
      }
      res.status(200).send({ data: 'Appointment update' });
    } catch (e) {
      next(e);
    }
  }
}

/**
 * [exports funtions in a object for use in the other files]
 * @type {AppointmentCtrl}
 */
module.exports = new AppointmentCtrl();
