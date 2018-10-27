const { Router } = require('express');

const router = Router();

const middlewares = require('../middlewares');
const { ensureAuth } = require('../middlewares');

const { userCtrl } = require('../controllers');

router.post('/login', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      password: 'required',
      email: 'email,required',
    },
  });
}, userCtrl.login);

router.get('/', [ensureAuth.haveSession, ensureAuth.havePermission], userCtrl.getAll);
router.get('/:id', ensureAuth.haveSession, userCtrl.getUser);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'word,required',
      Email: 'email,required',
      Password: 'required',
      Gender: 'required',
      UserType: 'word,required',
    },
  });
}, userCtrl.create);

router.put('/:id', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'word',
      Email: 'email',
      UserType: 'word',
    },
  });
}, ensureAuth.haveSession, userCtrl.edit);

module.exports = router;
