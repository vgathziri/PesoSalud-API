const router = require('express').Router();
const { ServicesPlacesCtrl } = require('../controllers');

router.post('/', ServicesPlacesCtrl.create);
router.get('/Service/:serviceID', ServicesPlacesCtrl.searchService);
router.get('/Place/:placeID', ServicesPlacesCtrl.searchPlaces);
// router.delete('/:serviceID-placeID', ServicesPlacesCtrl.edit);

module.exports = router;
