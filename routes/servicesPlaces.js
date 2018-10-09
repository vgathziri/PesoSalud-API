const { Router } = require('express');

const router = Router();

const middlewares = require('../middlewares');

const { ServicesPlacesCtrl } = require('../controllers');

router.get('/Service/:serviceID', ServicesPlacesCtrl.searchService);
router.get('/Place/:placeID', ServicesPlacesCtrl.searchPlaces);
// router.delete('/:serviceID-placeID', ServicesPlacesCtrl.edit);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      ServicesID: 'required',
      PlaceID: 'required',
    },
  });
}, ServicesPlacesCtrl.create);


module.exports = router;
