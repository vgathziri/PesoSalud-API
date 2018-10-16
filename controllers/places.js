const placesMdl = require('../models/places');

// FIXME Todos los metodos deben estar documentados

class PlacesCtrl {
  constructor() {
    this.getAll = this.constructor.getAll.bind(this);
    this.edit = this.constructor.edit.bind(this);
    this.create = this.constructor.create.bind(this);
  }

  static async getAll(req, res) {
    let data;
    try {
      data = await placesMdl.findAll();
    } catch (e) {
      res.status(400).send({ message: e });
      return;
    }

    res.status(200).send({ data });
  }

  static async create(req, res, next) {
    try {
      const data = await placesMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  static async edit(req, res, next) {
    try {
      const data = await placesMdl.edit(req.body, req.params.ID);

      if (data.length === 0) {
        res.status(400).send({ message: 'Place could not be found' });
        return;
      }

      res.status(200).send({ data: 'Place Updated' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PlacesCtrl();
