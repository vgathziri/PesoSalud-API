const router = require('express').Router();
const { dietsCtrl } = require('../controllers');

router.get('/', dietsCtrl.getAll);
router.post('/', dietsCtrl.create);
router.get('/:ID', dietsCtrl.get);
router.put('/:ID', dietsCtrl.edit);

module.exports = router;
