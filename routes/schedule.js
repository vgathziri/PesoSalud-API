const router = require('express').Router();
const { scheduleCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      WeekDay: 'required',
      StartTime: 'required',
      EndTime: 'required',
      Active: 'required',
    },
  });
}, scheduleCtrl.create);
router.put('/:ID', scheduleCtrl.edit);
router.get('/:weekDay', scheduleCtrl.get);

module.exports = router;
