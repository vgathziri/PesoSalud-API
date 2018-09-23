const router = require('express').Router();
const { PlacesCtrl } = require('../controllers');

router.get('/', PlacesCtrl.getAll);
router.post('/', PlacesCtrl.create);
router.put('/:ID', PlacesCtrl.edit);

module.exports = router;
