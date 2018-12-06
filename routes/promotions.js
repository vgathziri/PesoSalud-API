const router = require('express').Router();
const middlewares = require('../middlewares');
const { promotionsCtrl } = require('../controllers');
const { ensureAuth } = require('../middlewares');

router.get('/', [ensureAuth.haveSession, ensureAuth.havePermission], promotionsCtrl.getAll);
router.get('/:id', [ensureAuth.haveSession, ensureAuth.havePermission], promotionsCtrl.getPromotionbyUser);
router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      UserID: 'number,required',
      ServiceID: 'number,required',
      Date: 'date,required',
      QuantityBought: 'number,required',
    },
  });
}], promotionsCtrl.createPromotion);
router.put('/:id', [ensureAuth.haveSession, ensureAuth.havePermission], promotionsCtrl.editPromotion);

module.exports = router;
