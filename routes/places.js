const router = require('express').Router();
const { placesCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', placesCtrl.getAll);
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'required',
      PlaceType: 'required',
      Active: 'required',
    },
  });
}, placesCtrl.create);

// FIXME Falta en el middleware validar el param :ID que sea un identificador valido, ejem que sea un numero en un cierto rango
// FIXME Falta middleware para validar el cuerpo del request
router.put('/:ID', placesCtrl.edit);

// FIXME Falta ruta para eliminación

module.exports = router;
