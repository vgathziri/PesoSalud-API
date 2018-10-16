const { Router } = require('express');

const router = Router();

const middlewares = require('../middlewares');

const { dietsCtrl } = require('../controllers');

router.get('/', dietsCtrl.getAll);
// FIXME Falta en el middleware validar el param :id que sea un identificador valido, ejem que sea un numero en un cierto rango
router.get('/:ID', dietsCtrl.get);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'required',
      Descripcion: 'required',
      Active: 'required',
    },
  });
}, dietsCtrl.create);
// FIXME Falta en el middleware validar el param :id que sea un identificador valido, ejem que sea un numero en un cierto rango
router.put('/:ID', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'required',
    },
  });
}, dietsCtrl.edit);

// FIXME Falta ruta para eliminación

module.exports = router;
