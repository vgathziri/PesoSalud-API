const servicesMdl = require('../models/services');

class ServicesCtrl {
  constructor() {
    this.getAll = this.constructor.getAll.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
  }

  static async getAll(req, res) {
    let data;
    try {
      data = await servicesMdl.findAll('Services');
      if (data.length === 0) {
        res.status(400).send({ message: 'Service not found' });
        return;
      }
    } catch (e) {
      res.status(400).send({ message: e });
      return;
    }
    res.status(201).send({ data });
  }

  static async create(req, res, next) {
    try {
      const data = await servicesMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  static async edit(req, res, next) {
    try {
      const data = await servicesMdl.update(req.body, req.params.id);

      // In case user was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'Service could not be updated' });
        return;
      }

      res.status(200).send({ data: 'Service updated' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ServicesCtrl();
