const servicesPlacesMdl = require('../models/servicesPlaces');

class ServicesPlacesCtrl {
  constructor() {
    this.create = this.constructor.create.bind(this);
    this.searchService = this.constructor.searchService.bind(this);
    this.searchPlaces = this.constructor.searchPlaces.bind(this);
  }

  static async create(req, res, next) {
    try {
      const data = await servicesPlacesMdl.create('ServicesPlaces', req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  static async searchService(req, res, next) {
    try {
      const data = await servicesPlacesMdl.findByService('Services_Places', req.params.id);

      // In case user was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'Service not found' });
      }

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  static async searchPlaces(req, res, next) {
    try {
      const data = await servicesPlacesMdl.findByPlace('Services_Places', req.params.id);

      // In case user was not found
      if (data.length === 0) {
        res.status(400).send({ message: 'Places not found' });
      }

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }
}

// find by 2
module.exports = new ServicesPlacesCtrl();
