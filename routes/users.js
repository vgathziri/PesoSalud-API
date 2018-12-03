const { Router } = require('express');

const router = Router();
const multer = require('multer');
const middlewares = require('../middlewares');

const upload = multer({ dest: 'files/' });
const { userCtrl } = require('../controllers');
const { ensureAuth } = require('../middlewares');


router.post('/login', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      password: 'required',
      email: 'email,required',
    },
  });
}, userCtrl.login);

router.post('/password_reset', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      email: 'email,required',
    },
  });
}, userCtrl.passwordReset);

router.put('/password_reset/:token', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      password: 'required',
    },
  });
}, userCtrl.updatePassword);

router.get('/verify-email/:token', userCtrl.activateUser);

// CRUD
router.get('/', [ensureAuth.haveSession, ensureAuth.havePermission], userCtrl.getAll);
router.get('/:id', [ensureAuth.haveSession, ensureAuth.havePermission], userCtrl.getUser);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'word,required',
      Email: 'email,required',
      Password: 'required',
      Gender: 'required',
      UserType: 'required',
    },
  });
}, userCtrl.create);

router.put('/:id', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'word',
      Email: 'email',
      UserType: 'word',
    },
  });
}], userCtrl.edit);

router.post('/setPicture', [ensureAuth.haveSession, upload.single('picture')], userCtrl.setPicture);

module.exports = router;
