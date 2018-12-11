const router = require('express').Router();
const middlewares = require('../middlewares');
const { medicalRecordsCtrl } = require('../controllers');
const { ensureAuth } = require('../middlewares');

router.get('/user/:userID', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      userID: 'required,number',
    },
  });
}], medicalRecordsCtrl.getByUserID);

router.get('/:appointmentID', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      appointmentID: 'required,number',
    },
  });
}], medicalRecordsCtrl.getByAppointmentID);

router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      userID: 'required,number',
      appointmentID: 'required,number',
      serviceID: 'required,number',
      weight: 'decimal',
      bust: 'decimal',
      waist: 'decimal',
      waistline: 'decimal',
      hip: 'decimal',
      chest: 'decimal',
      abdomen: 'decimal',
      dietID: 'number',
      symptom: 'word',
      comments: 'word',
      initialHighAbdomen: 'decimal',
      finalHighAbdomen: 'decimal',
      initialMediumAbdomen: 'decimal',
      finalMediumAbdomen: 'decimal',
      initialLowAbdomen: 'decimal',
      finalLowAbdomen: 'decimal',
    },
  });
}], medicalRecordsCtrl.create);

router.put('/:id', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      userID: 'number',
      appointmentID: 'number',
      serviceID: 'number',
      weight: 'decimal',
      bust: 'decimal',
      waist: 'decimal',
      waistline: 'decimal',
      hip: 'decimal',
      chest: 'decimal',
      abdomen: 'decimal',
      dietID: 'number',
      symptom: 'word',
      comments: 'word',
      initialHighAbdomen: 'decimal',
      finalHighAbdomen: 'decimal',
      initialMediumAbdomen: 'decimal',
      finalMediumAbdomen: 'decimal',
      initialLowAbdomen: 'decimal',
      finalLowAbdomen: 'decimal',
    },
    params: {
      id: 'required,number',
    },
  });
}], medicalRecordsCtrl.edit);

module.exports = router;
