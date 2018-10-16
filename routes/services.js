const { Router } = require('express');

const router = Router();

const middlewares = require('../middlewares');

const { serviceCtrl } = require('../controllers');

router.get('/', serviceCtrl.getAll);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'word,required',
      Description: 'required',
      Price: 'required',
      Duration: 'required',
      Active: 'required',
    },
  });
}, serviceCtrl.create);

// FIXME Falta un middleware para validar el param :id que sea un identificador valido, ejem que sea un numero en un cierto rango
router.put('/:id', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'word',
      Description: 'required',
    },
  });
}, serviceCtrl.edit);

// FIXME Falta ruta para eliminación

module.exports = router;
