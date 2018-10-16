const router = require('express').Router();
const { appointmentCtrl } = require('../controllers');
const middlewares = require('../middlewares');

// FIXME Falta en el middleware validar el param :date que sea un identificador valido, ejem que sea un numero en un cierto rango
router.get('/:date', appointmentCtrl.getByDate);

// FIXME Falta en el middleware validar el param :userID que sea un identificador valido, ejem que sea un numero en un cierto rango
router.get('/user/:userID', appointmentCtrl.getByUserID);

// FIXME Falta en el middleware validar el param :placeID que sea un identificador valido, ejem que sea un numero en un cierto rango
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
// FIXME Falta en el middleware validar el param :id que sea un identificador valido, ejem que sea un numero en un cierto rango
// FIXME Falta middleware para validar el cuerpo del request
router.put('/:id', appointmentCtrl.edit);

// FIXME Falta ruta para eliminación

module.exports = router;
