const router = require('express').Router();
const { placesCtrl } = require('../controllers');

router.get('/', placesCtrl.getAll);
router.post('/', placesCtrl.create);
router.put('/:ID', placesCtrl.edit);

module.exports = router;
