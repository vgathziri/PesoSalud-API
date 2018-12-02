const servicesPlacesMdl = require('../models/servicesPlaces');
/**
 * [ServicesPlacesCtrl is a class that initializes the functions and the prototype of them]
 */
class ServicesPlacesCtrl {
  constructor() {
    this.create = this.constructor.create.bind(this);
    this.searchService = this.constructor.searchService.bind(this);
    this.searchPlaces = this.constructor.searchPlaces.bind(this);
  }

  /**
   * [create is a function of add a new Service Places]
   * @param  {Function} next [create]
   * @return {json}      [return 201 when is created a new objet in db]
   */
  static async create(req, res, next) {
    try {
      const data = await servicesPlacesMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  /**
   * [searchService is a function to get services by id]
   * @param  {[int]}   req  [id]
   * @return {json}       [returns the object in case that exist or 400 if doesn't exists]
   */
  static async searchService(req, res, next) {
    try {
      const data = await servicesPlacesMdl.findByService(req.params.serviceID);

      // In case user was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'Service not found' });
        return;
      }

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  /**
   * [searchPlaces is a function to get Places by id]
   * @param  {[int]}   req  [id]
   * @return {json}       [returns the object in case that exist or 400 if doesn't exists]
   */
  static async searchPlaces(req, res, next) {
    try {
      console.log(req.params);
      const data = await servicesPlacesMdl.findByPlace(req.params.placeID);

      // In case user was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'Places not found' });
        return;
      }

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ServicesPlacesCtrl();
