const router = require('express').Router();
const { appointmentCtrl } = require('../controllers');

router.get('/:date', appointmentCtrl.getByDate);

router.get('/:userID', appointmentCtrl.getByUserID);

router.get('/:placeID', appointmentCtrl.getByPlaceID);

router.post('/', appointmentCtrl.create);

router.put('/:id', appointmentCtrl.edit);

module.exports = router;
