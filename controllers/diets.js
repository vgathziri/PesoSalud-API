const dietsMdl = require('../models/diets');

class DietsCtrl {
  constructor() {
    this.getAll = this.constructor.getAll.bind(this);
    this.get = this.constructor.getID.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
  }

  static async getAll(req, res) {
    let data;
    try {
      data = await dietsMdl.findAll();
      if (data.length === 0) {
        res.status(400).send({ message: 'Diet not found' });
      }
    } catch (e) {
      res.status(400).send({ message: e });
    }
    res.status(201).send({ data });
  }

  static async getID(req, res, next) {
    try {
      const data = await dietsMdl.findById(req.params.id);

      // In case user was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'Diet not found' });
      }

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const data = await dietsMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  static async edit(req, res, next) {
    try {
      const data = await dietsMdl.update('Diets', req.body, req.params.id);

      // In case user was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'Diet could not be updated' });
      }

      res.status(200).send({ data: 'Diet updated' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DietsCtrl();
