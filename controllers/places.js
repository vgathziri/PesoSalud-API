const placesMdl = require('../models/places');
/**
 * [PlacesCtrl its a class to manage search, add new data and updated fuctions ]
 */
class PlacesCtrl {
  constructor() {
    this.getAll = this.constructor.getAll.bind(this);
    this.edit = this.constructor.edit.bind(this);
    this.create = this.constructor.create.bind(this);
  }

  /**
 * [create Fuction for Add a new Object Places]
 * @param  {[Object]}   req  [Client required body for new Place  ]
 * @param  {[Object]}   res  [Response that status to the fuction and send data]
 * @param  {Function} next [Argument for the next fuction in the middlewear]
 * @return {Promise}       [Continue with the next fuction]
 */
  static async create(req, res, next) {
    try {
      const data = await placesMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  /**
 * [getAll Fuction for show Places registers]
 * @param  {[Object]}  req [Client require show body the all objects in  table ]
 * @param  {[object]}  res [Status 400 when table dont have registers or 201 if it has data]
 * @return {Promise}     [Status 200 , successful show data registers]
 */
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

  /**
   * [edit fuction search register and updated with  new changes in Places  ]
   * @param  {[Object]}   req  [ Body and id (int)  param to Especific attribute  key identifier ]
   * @param  {[Object]}   res  [Return status 400 if dont have any value equal]
   * @param  {Function} next [Argument for continue the next fuction and manage error]
   */
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
/**
   * [exports Fuction Ctrl in object for the use in the other files]
   * @type {PlacesCtrl}
   */
module.exports = new PlacesCtrl();
