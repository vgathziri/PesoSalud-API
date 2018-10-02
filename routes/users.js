const { Router } = require('express');

const router = Router();

// const middlewares = require('../middlewares');

const { userCtrl } = require('../controllers');

//  router.get('/users', [middlewares.requireAuth, middlewares.lala], usersCtrl.getAll);
//  router.get('/all-users',middlewares.ensureAuth, usersCtrl.getAll)
router.get('/', userCtrl.getAll);
router.get('/:id', userCtrl.get);
router.post('/', userCtrl.create);
router.put('/', userCtrl.edit);
module.exports = router;
