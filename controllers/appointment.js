const AppointmentMdl = require('../models/appointment');

class AppointmentCtrl {
  constructor() {
    //
    this.getByDate = this.constructor.getByDate.bind(this);
    this.getByUserID = this.constructor.getByUserID.bind(this);
    this.getByPlaceID = this.constructor.getByPlaceID.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
  }

  static async getByDate(req, res, next) {
    try {
      const data = await AppointmentMdl.findByDate('Date', req.params.DateID);
      // In case Data was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'Date not found' });
      }
      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  static async getByUserID(req, res, next) {
    try {
      const data = await AppointmentMdl.findByUserID('UserID', req.params.UserID);
      // In case User ID was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'User  not found' });
      }
      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  static async getByPlaceID(req, res, next) {
    try {
      const data = await AppointmentMdl.findByPlaceID('PlaceID', req.params.PlaceID);
      // In case Place was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'Place not found' });
      }
      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const data = await AppointmentMdl.create('Appointment', req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  static async edit(req, res, next) {
    try {
      const data = await AppointmentMdl.update('Appointment', req.body, req.params.appId);

      if (data.length === 0) {
        res.status(400).send({ message: 'Appointment could not be aupdate' });
      }
      res.status(200).send({ data: 'Appointment update' });
    } catch (e) {
      next(e);
    }
  }
}


module.exports = new AppointmentCtrl();
