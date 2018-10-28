const router = require('express').Router();
const middlewares = require('../middlewares');
const { scheduleCtrl } = require('../controllers');
const { ensureAuth } = require('../middlewares');

router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      WeekDay: 'required',
      StartTime: 'required',
      EndTime: 'required',
      Active: 'required',
    },
  });
}], scheduleCtrl.create);
router.put('/:ID', [ensureAuth.haveSession, ensureAuth.havePermission], scheduleCtrl.edit);
router.get('/:weekDay', [ensureAuth.haveSession, ensureAuth.havePermission], scheduleCtrl.get);

module.exports = router;
