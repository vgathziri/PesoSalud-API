const router = require('express').Router();
const middlewares = require('../middlewares');
const { ServicesPlacesCtrl } = require('../controllers');
const { ensureAuth } = require('../middlewares');

/**
 * [get is a route gets a service in specific]
 */
router.get('/Service/:serviceID', [ensureAuth.haveSession, ensureAuth.havePermission], ServicesPlacesCtrl.searchService);

/**
 * [get is a route gets a place in specific]
 */
router.get('/Place/:placeID', [ensureAuth.haveSession, ensureAuth.havePermission], ServicesPlacesCtrl.searchPlaces);

/**
 * [post is a route adds a new services places]
*/
router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      ServicesID: 'required',
      PlaceID: 'required',
    },
  });
}], ServicesPlacesCtrl.create);


module.exports = router;
