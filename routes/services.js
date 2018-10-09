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

router.put('/:id', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'word',
      Description: 'required',
    },
  });
}, serviceCtrl.edit);

module.exports = router;
