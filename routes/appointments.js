const router = require('express').Router();
const { appointmentCtrl } = require('../controllers');
const middlewares = require('../middlewares');
const { ensureAuth } = require('../middlewares');

router.get('/:date', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      date: 'required,date',
    },
  });
}], appointmentCtrl.getByDate);

router.get('/user/:userID', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      userID: 'required,number',
    },
  });
}], appointmentCtrl.getByUserID);

router.get('/place/:placeID', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      placeID: 'required,number',
    },
  });
}], appointmentCtrl.getByPlaceID);

router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      userID: 'number,required',
      date: 'date,required',
      placeID: 'number,required',
      serviceID: 'number,required',
      status: 'word,required',
    },
  });
}], appointmentCtrl.create);

router.put('/:id', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      UserID: 'number',
      Date: 'date',
      PlaceID: 'number',
      ServiceID: 'number',
      Status: 'word',
    },
    params: {
      id: 'number',
    },
  });
}], appointmentCtrl.edit);

module.exports = router;
