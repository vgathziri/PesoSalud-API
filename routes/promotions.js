const { Router } = require('express');

const router = Router();

const { promotionsCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', promotionsCtrl.getAll);
router.get('/:id', promotionsCtrl.getPromotionbyUser);
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      UserID: 'required',
      ServiceID: 'required',
      Date: 'required',
      QuantityBought: 'required',
    },
  });
}, promotionsCtrl.createPromotion);
router.put('/:id', promotionsCtrl.editPromotion);

module.exports = router;
