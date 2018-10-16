const userMdl = require('../models/users');

// FIXME Todos los metodos deben estar documentados

class UserCtrl {
  constructor() {
    // Binding this to not loose context on router
    this.getAll = this.constructor.getAll.bind(this);
    this.getUser = this.constructor.getUser.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
  }

  static async getAll(req, res) {
    let data;
    try {
      data = await userMdl.findAll();
      if (data.length === 0) {
        return res.status(400).send({ message: 'Users not found' });
      }
    } catch (e) {
      return res.status(400).send({ message: e });
    }
    // FIXME Esto debería ser un return para confirmar que termine el flujo
    res.status(201).send({ data });
  }

  static async getUser(req, res, next) {
    try {
      const data = await userMdl.findById(req.params.id);

      // In case user was not found
      if (data.length === 0) {
        return res.status(400).send({ message: 'User not found' });
      }
      // FIXME Esto debería ser un return para confirmar que termine el flujo
      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const data = await userMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  static async edit(req, res, next) {
    try {
      const data = await userMdl.update(req.body, req.params.id);

      // In case user was not found
      if (data.length === 0) {
        return res.status(400).send({ message: 'User could not be updated' });
      }

      res.status(200).send({ data: 'User updated' });
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new UserCtrl();
