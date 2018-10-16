const router = require('express').Router();
const { medicalRecordsCtrl } = require('../controllers');

const middlewares = require('../middlewares');

// FIXME Falta en el middleware validar el param :userID que sea un identificador valido, ejem que sea un numero en un cierto rango
router.get('/user/:userID', medicalRecordsCtrl.getByUserID);

// FIXME Falta en el middleware validar el param :appointmentID que sea un identificador valido, ejem que sea un numero en un cierto rango
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

// FIXME Falta en el middleware validar el param :id que sea un identificador valido, ejem que sea un numero en un cierto rango
// FIXME Falta middleware para validar el cuerpo del request
router.put('/:id', medicalRecordsCtrl.edit);

// FIXME Falta ruta para eliminación

module.exports = router;
