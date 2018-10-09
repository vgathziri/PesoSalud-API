const medicalRecordsMdl = require('../models/medicalRecords');

class MedicalRecordsCtrl {
  constructor() {
    this.getByAppointmentID = this.constructor.getByAppointmentID.bind(this);
    this.getByUserID = this.constructor.getByUserID.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
  }

  static async getByAppointmentID(req, res, next) {
    try {
      console.log('req.params.appointmentID: ', req.params.appointmentID);
      const data = await medicalRecordsMdl.findByAppointmentID(req.params.appointmentID);

      if (data.lenght === 0) {
        res.status(409).send({
          message: 'Record not found',
        });
      }

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  static async getByUserID(req, res, next) {
    try {
      const data = await medicalRecordsMdl.findByUser(req.params.userID);

      if (data.lenght === 0) {
        res.status(409).send({
          message: 'Record not found',
        });
      }

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const data = await medicalRecordsMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  static async edit(req, res) {
    try {
      const data = await medicalRecordsMdl.edit(req.body, req.params.id);

      if (data.lenght === 0) {
        res.status(400).send({ message: 'Record could not be updated' });
      }

      res.status(200).send({ message: 'Record updated' });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new MedicalRecordsCtrl();
