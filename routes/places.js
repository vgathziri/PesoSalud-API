const router = require('express').Router();
const middlewares = require('../middlewares');
const { placesCtrl } = require('../controllers');
const { ensureAuth } = require('../middlewares');

router.get('/', [ensureAuth.haveSession, ensureAuth.havePermission], placesCtrl.getAll);
router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'required,word',
      placeType: 'required,word',
      active: 'required,bool',
    },
  });
}], placesCtrl.create);
router.put('/:ID', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word',
      placeType: 'word',
      active: 'bool',
    },
    params: {
      ID: 'number',
    },
  });
}], placesCtrl.edit);

module.exports = router;
