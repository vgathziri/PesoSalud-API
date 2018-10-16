const router = require('express').Router();
const { scheduleCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      WeekDay: 'required',
      StartTime: 'required',
      EndTime: 'required',
      Active: 'required',
    },
  });
}, scheduleCtrl.create);
// FIXME Falta en el middleware validar el param :ID que sea un identificador valido, ejem que sea un numero en un cierto rango
// FIXME Falta middleware para validar el cuerpo del request
router.put('/:ID', scheduleCtrl.edit);
// FIXME Falta en el middleware validar el param :weekDay que sea un identificador valido, ejem que sea un numero en un cierto rango
router.get('/:weekDay', scheduleCtrl.get);

// FIXME Falta ruta para eliminación

module.exports = router;
