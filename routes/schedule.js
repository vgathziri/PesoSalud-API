const router = require('express').Router();
const { scheduleCtrl } = require('../controllers');

router.post('/', scheduleCtrl.create);
router.put('/:ID', scheduleCtrl.edit);
router.get('/:weekDay', scheduleCtrl.get);

module.exports = router;
