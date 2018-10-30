const router = require('express').Router();
const middlewares = require('../middlewares');
const { scheduleCtrl } = require('../controllers');
const { ensureAuth } = require('../middlewares');

router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      WeekDay: 'required,weekDay',
      StartTime: 'required,hour',
      EndTime: 'required,hour',
      Active: 'required,bool',
    },
  });
}], scheduleCtrl.create);

router.put('/:ID', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      id: 'number,required',
    },
    body: {
      WeekDay: 'weekDay',
      StartTime: 'hour',
      EndTime: 'hour',
      Active: 'bool',
    },
  });
}], scheduleCtrl.edit);

router.get('/:weekDay', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      weekDay: 'weekDay,required',
    },
  });
}], scheduleCtrl.get);

module.exports = router;
