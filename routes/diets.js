const { Router } = require('express');

const router = Router();

const middlewares = require('../middlewares');

const { dietsCtrl } = require('../controllers');

router.get('/', dietsCtrl.getAll);

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

router.put('/:ID', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'required',
    },
  });
}, dietsCtrl.edit);

module.exports = router;
