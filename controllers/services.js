const servicesMdl = require('../models/services');

// FIXME Todos los metodos deben estar documentados

class ServicesCtrl {
  constructor() {
    this.getAll = this.constructor.getAll.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
  }

  /**
   * [getAll is a function that get all services]
   * @param  {[function]}  res [findAll]
   * @return {response}     [return status 400 if doesnt find services or 2012 if find all services]
   */
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

  /**
   * [create is a function of add a new Service]
   * @param  {Function} next [create]
   * @return {response}      [return 201 when is created a new objet in db]
   */
  static async create(req, res, next) {
    try {
      const data = await servicesMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  /**
 * [edit is a funtion of edit a service in specific]
 * @param  {[int]}   req  [id]
 * @param  {Function} next [update]
 * @return {response}       [return 200 if diet is updated or 400 if it couldn´t be found]
 */
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
