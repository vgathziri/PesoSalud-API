const router = require('express').Router();
const middlewares = require('../middlewares');
const { placesCtrl } = require('../controllers');
const { ensureAuth } = require('../middlewares');

router.get('/', [ensureAuth.haveSession, ensureAuth.havePermission], placesCtrl.getAll);
router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'required',
      PlaceType: 'required',
      Active: 'required',
    },
  });
}], placesCtrl.create);
router.put('/:ID', [ensureAuth.haveSession, ensureAuth.havePermission], placesCtrl.edit);

module.exports = router;
