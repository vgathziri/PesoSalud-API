const router = require('express').Router();
const middlewares = require('../middlewares');
const { serviceCtrl } = require('../controllers');
const { ensureAuth } = require('../middlewares');

/**
 * [get is a route gets everything services that is registered]
 */
router.get('/', [ensureAuth.haveSession, ensureAuth.havePermission], serviceCtrl.getAll);

/**
 * [post is a route adds a new Services]
*/
router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      description: 'required,word',
      price: 'required,decimal',
      duration: 'required,number',
      active: 'required,bool',
    },
  });
}], serviceCtrl.create);

/**
 * [put es a route that update the services]
 */
router.put('/:id', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word',
      description: 'required,word',
      price: 'decimal',
      duration: 'number',
      active: 'bool',
    },
    params: {
      id: 'required,number',
    },
  });
}], serviceCtrl.edit);

module.exports = router;
