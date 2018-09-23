const router = require('express').Router();
const { medicalRecordsCtrl } = require('../controllers');

router.get('/:userID', medicalRecordsCtrl.getByUserID);

router.get('/:appointmentID', medicalRecordsCtrl.getByAppointmentID);

router.post('/', medicalRecordsCtrl.create);

router.put('/:id', medicalRecordsCtrl.edit);

module.exports = router;
