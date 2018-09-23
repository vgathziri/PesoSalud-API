const router = require('express').Router();
const { ScheduleCtrl } = require('../controllers');

router.post('/', ScheduleCtrl.create);
router.put('/:ID', ScheduleCtrl.edit);
router.get('/:weekDay', ScheduleCtrl.search);

module.exports = router;
