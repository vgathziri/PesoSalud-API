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
      console.log(req.params);
      const data = await AppointmentMdl.findByDate(req.params.date);
      // In case Data was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'Date not found' });
        return;
      }
      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  static async getByUserID(req, res, next) {
    try {
      const data = await AppointmentMdl.findByUserID(req.params.userID);
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

  static async getByPlaceID(req, res, next) {
    try {
      const data = await AppointmentMdl.findByPlaceID(req.params.placeID);
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

  static async create(req, res, next) {
    try {
      const data = await AppointmentMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  static async edit(req, res, next) {
    try {
      console.log(req.params);
      const data = await AppointmentMdl.update(req.body, req.params.id);

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


module.exports = new AppointmentCtrl();
