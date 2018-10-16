// FIXME Deben estandarizar si usaran camelCase para clases estaticas o UpperCamelCase como se recomienda
const dietsMdl = require('../models/diets');

// FIXME Todos los metodos deben estar documentados

class DietsCtrl {
  constructor() {
    this.getAll = this.constructor.getAll.bind(this);
    this.get = this.constructor.getID.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
  }

  /**
 * [getAll is a function to get all diets]
 * @return {json}     [returns the objets]
 */

  static async getAll(req, res) {
    let data;
    try {
      data = await dietsMdl.findAll('Diets');
      if (data.length === 0) {
        res.status(400).send({ message: 'Diet not found' });
        return;
      }
    } catch (e) {
      res.status(400).send({ message: e });
      return;
    }
    res.status(201).send({ data });
  }

  /**
   * [getID is a function to get diets by id]
   * @param  {[int]}   req  [id]
   * @return {json}       [returns the object in case that exist or 400 if doesn't exists]
   */

  static async getID(req, res, next) {
    try {
      const data = await dietsMdl.findById(req.params.ID);

      // In case user was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'Diet not found' });
        return;
      }

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  /**
   * [create is a function of add a new diet]
   * @param  {Function} next [create]
   * @return {response}      [return 201 when is created a new objet in db]
   */

  static async create(req, res, next) {
    try {
      const data = await dietsMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  /**
 * [edit is a funtion of edit o diet in specific]
 * @param  {[int]}   req  [id]
 * @param  {Function} next [update]
 * @return {response}       [return 200 if diet is updated or 400 if it couldn´t be found]
 */

  static async edit(req, res, next) {
    try {
      const data = await dietsMdl.update(req.body, req.params.ID);

      // In case user was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'Diet could not be updated' });
        return;
      }

      res.status(200).send({ data: 'Diet updated' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DietsCtrl();
