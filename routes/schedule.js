const router = require('express').Router();
const middlewares = require('../middlewares');
const { scheduleCtrl } = require('../controllers');
const { ensureAuth } = require('../middlewares');

router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      weekDay: 'required,weekDay',
      startTime: 'required,hour',
      endTime: 'required,hour',
      active: 'required,bool',
    },
  });
}], scheduleCtrl.create);

router.put('/:ID', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      id: 'number,required',
    },
    body: {
      weekDay: 'weekDay',
      startTime: 'hour',
      endTime: 'hour',
      active: 'bool',
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
