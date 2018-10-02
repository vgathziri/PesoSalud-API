const { Router } = require('express');

const router = Router();

// const middlewares = require('../middlewares');

const { usersCtrl } = require('../controllers');

// router.get('/users', [middlewares.requireAuth, middlewares.lala], usersCtrl.getAll);
// router.get('/all-users', middlewares.ensureAuth, usersCtrl.getAll);
router.get('/users', usersCtrl.getAll);

module.exports = router;
