const router = require('express').Router();
const { DietsCtrl } = require('../controllers');

router.get('/', DietsCtrl.getAll);
router.post('/', DietsCtrl.create);
router.get('/:ID', DietsCtrl.searchID);
router.put('/:ID', DietsCtrl.edit);

module.exports = router;
