const medicalRecordsMdl = require('../models/medicalRecords');

/**
 * [MedicalRecordsCtrl is a class that initializes the functions and the prototype of them]
 */
class MedicalRecordsCtrl {
  constructor() {
    this.getByAppointmentID = this.constructor.getByAppointmentID.bind(this);
    this.getByUserID = this.constructor.getByUserID.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
  }

  /**
   * [getByAppointmentID is a function to get appointment by id]
   * @param  {[int]}   req  [id]
   * @return {json}       [returns the object in case that exist or 400 if doesn't exists]
   */
  static async getByAppointmentID(req, res, next) {
    try {
      const data = await medicalRecordsMdl.findByAppointmentID(req.params.appointmentID);

      if (data.lenght === 0) {
        res.status(400).send({
          message: 'Record not found',
        });
        return;
      }

      res.status(200).send({ data });
      return;
    } catch (e) {
      next(e);
    }
  }

  /**
 * [getByUserID is a function to get medicalRecords by user id]
 * @param  {[int]}   req  [id]
 * @return {json}       [returns the object in case that exist or 400 if doesn't exists]
 */
  static async getByUserID(req, res, next) {
    try {
      const data = await medicalRecordsMdl.findByUser(req.params.userID);

      if (data.lenght === 0) {
        res.status(409).send({
          message: 'Record not found',
        });
        return;
      }

      res.status(200).send({ data });
      return;
    } catch (e) {
      next(e);
    }
  }

  /**
   * [create is a function of add a new medicalRecord]
   * @param  {Function} next [create]
   * @return {response}      [return 201 when is created a new objet in db]
   */
  static async create(req, res, next) {
    try {
      const data = await medicalRecordsMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
      return;
    } catch (e) {
      next(e);
    }
  }

  /**
  * [edit is a funtion of edit a medicalRecord in specific]
  * @param  {[int]}   req  [id]
  * @param  {Function} next [update]
  * @return {response}       [returns status 200 if medicalRecord is updated or
  * status 400 if it couldn´t be found]
  */
  static async edit(req, res) {
    try {
      const data = await medicalRecordsMdl.edit(req.body, req.params.id);

      if (data.lenght === 0) {
        return res.status(400).send({ message: 'Record could not be updated' });
      }

      return res.status(200).send({ message: 'Record updated' });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new MedicalRecordsCtrl();
