const router = require('express').Router();
const { ServicesPlacesCtrl } = require('../controllers');

router.post('/', ServicesPlacesCtrl.create);
router.get('/:serviceID', ServicesPlacesCtrl.searchService);
router.get('/:placeID', ServicesPlacesCtrl.searchPlaces);
// router.delete('/:serviceID-placeID', ServicesPlacesCtrl.edit);

module.exports = router;
