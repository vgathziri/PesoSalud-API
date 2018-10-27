const router = require('express').Router();
const middlewares = require('../middlewares');
const { medicalRecordsCtrl } = require('../controllers');
const { ensureAuth } = require('../middlewares');

router.get('/user/:userID', [ensureAuth.haveSession, ensureAuth.havePermission], medicalRecordsCtrl.getByUserID);

router.get('/:appointmentID', [ensureAuth.haveSession, ensureAuth.havePermission], medicalRecordsCtrl.getByAppointmentID);

router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      userID: 'required',
      appointmentID: 'required',
      serviceID: 'required',
    },
  });
}], medicalRecordsCtrl.create);

router.put('/:id', [ensureAuth.haveSession, ensureAuth.havePermission], medicalRecordsCtrl.edit);

module.exports = router;
