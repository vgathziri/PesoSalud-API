const router = require('express').Router();
const { appointmentCtrl } = require('../controllers');
const middlewares = require('../middlewares');
const { ensureAuth } = require('../middlewares');

router.get('/:date', [ensureAuth.haveSession, ensureAuth.havePermission], appointmentCtrl.getByDate);

router.get('/user/:userID', [ensureAuth.haveSession, ensureAuth.havePermission], appointmentCtrl.getByUserID);

router.get('/place/:placeID', [ensureAuth.haveSession, ensureAuth.havePermission], appointmentCtrl.getByPlaceID);

router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      UserID: 'required',
      Date: 'required',
      PlaceID: 'required',
      ServiceID: 'required',
      Status: 'required',
    },
  });
}], appointmentCtrl.create);

router.put('/:id', [ensureAuth.haveSession, ensureAuth.havePermission], appointmentCtrl.edit);

module.exports = router;
