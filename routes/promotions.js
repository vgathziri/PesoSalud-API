const { Router } = require('express');

const router = Router();

const { promotionsCtrl } = require('../controllers');

router.get('/', promotionsCtrl.getAll);
router.get('/:id', promotionsCtrl.getPromotionbyUser);
router.post('/', promotionsCtrl.createPromotion);
router.put('/:id', promotionsCtrl.editPromotion);

module.exports = router;
