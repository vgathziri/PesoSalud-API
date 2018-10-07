const { Router } = require('express');

const router = Router();

const middlewares = require('../middlewares');

const { userCtrl } = require('../controllers');

router.get('/', userCtrl.getAll);
router.get('/:id', userCtrl.getUser);

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

router.put('/:id', userCtrl.edit);

module.exports = router;
