const { Router } = require('express');

const router = Router();

const middlewares = require('../middlewares');

const { userCtrl } = require('../controllers');

router.get('/', userCtrl.getAll);
// FIXME Falta un middleware para validar el param :id que sea un identificador valido, ejem que sea un numero en un cierto rango
router.get('/:id', userCtrl.getUser);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'word,required',
      Email: 'email,required',
      Password: 'required',
      Gender: 'required',
      UserType: 'word,required',
    },
  });
}, userCtrl.create);

// FIXME Falta en el middleware validar el param :id que sea un identificador valido, ejem que sea un numero en un cierto rango
router.put('/:id', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'word',
      Email: 'email',
      UserType: 'word',
    },
  });
}, userCtrl.edit);

// FIXME Falta ruta para eliminación

module.exports = router;
