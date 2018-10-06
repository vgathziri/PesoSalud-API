const { Router } = require('express');

const router = Router();

const { userCtrl } = require('../controllers');

router.get('/', userCtrl.getAll);
router.get('/:id', userCtrl.getUser);
router.post('/', userCtrl.create);
router.put('/:id', userCtrl.edit);

module.exports = router;
