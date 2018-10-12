const { Router } = require('express');

const router = Router();

const { promotionsCtrl } = require('../controllers');
const middlewares = require('../middlewares');

/**
 * [It is a route gets resourse
 * all the promotions has in the register]
 * @type {Object}
 */
router.get('/', promotionsCtrl.getAll);

/**
 * [Its a method for gets resourse the search
 * the promotions per id of user]
 * @type {Object}
 */
router.get('/:id', promotionsCtrl.getPromotionbyUser);

/**
 * [ Auxiliary  Method post the resourse,
 *  before create a new promotions we need to validate data ]
 * @type {Object}
 */
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

/**
 * [Its a method put for resourse replace data,
 *  when we want change data of the register ]
 * @type {[type]}
 */
router.put('/:id', promotionsCtrl.editPromotion);

module.exports = router;
