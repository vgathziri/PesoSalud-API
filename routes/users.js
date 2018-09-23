const { Router } = require('express');

const router = Router();

// const middlewares = require('../middlewares');

const { usersCtrl } = require('../controllers');

//  router.get('/users', [middlewares.requireAuth, middlewares.lala], usersCtrl.getAll);
//  router.get('/all-users',middlewares.ensureAuth, usersCtrl.getAll)
router.get('/', usersCtrl.getAll);
router.get('/:id', usersCtrl.get);
router.post('/', usersCtrl.create);
router.put('/', usersCtrl.edit);
module.exports = router;
