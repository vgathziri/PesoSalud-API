const router = require('express').Router();
const { appointmentCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/:date', appointmentCtrl.getByDate);

router.get('/user/:userID', appointmentCtrl.getByUserID);

router.get('/place/:placeID', appointmentCtrl.getByPlaceID);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      UserID: 'required',
      Date: 'required',
      PlaceID: 'required',
      ServiceID: 'required',
      Status: 'required',
    },
  });
}, appointmentCtrl.create);

router.put('/:id', appointmentCtrl.edit);

module.exports = router;
