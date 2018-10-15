const { Router } = require('express');

const router = Router();

const middlewares = require('../middlewares');

const { ServicesPlacesCtrl } = require('../controllers');

/**
 * [get is a route gets a service in specific]
 */
router.get('/Service/:serviceID', ServicesPlacesCtrl.searchService);

/**
 * [get is a route gets a place in specific]
 */
router.get('/Place/:placeID', ServicesPlacesCtrl.searchPlaces);

/**
 * [post is a route adds a new services places]
*/
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      ServicesID: 'required',
      PlaceID: 'required',
    },
  });
}, ServicesPlacesCtrl.create);


module.exports = router;
