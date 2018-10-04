const router = require('express').Router();
const { serviceCtrl } = require('../controllers');

router.get('/', serviceCtrl.getAll);

router.post('/', serviceCtrl.create);

router.put('/:id', serviceCtrl.edit);

module.exports = router;
