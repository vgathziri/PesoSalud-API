const router = require('express').Router();
const { medicalRecordsCtrl } = require('../controllers');

const middlewares = require('../middlewares');

router.get('/user/:userID', medicalRecordsCtrl.getByUserID);

router.get('/:appointmentID', medicalRecordsCtrl.getByAppointmentID);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      userID: 'required',
      appointmentID: 'required',
      serviceID: 'required',
    },
  });
}, medicalRecordsCtrl.create);

router.put('/:id', medicalRecordsCtrl.edit);

module.exports = router;
