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
router.put('/:ID', placesCtrl.edit);

module.exports = router;
