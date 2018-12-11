const router = require('express').Router();
const middlewares = require('../middlewares');
const { dietsCtrl } = require('../controllers');
const { ensureAuth } = require('../middlewares');

/**
 * [get is a route gets everything diets that is registered]
 */
router.get('/', [ensureAuth.haveSession, ensureAuth.havePermission], dietsCtrl.getAll);

/**
 * [get by id is a route get a diet in specific]
 */

router.get('/:ID', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      ID: 'required,number',
    },
  });
}], dietsCtrl.get);

/**
 * [post is a route adds a new diet]
*/
router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'required',
      description: 'word,required',
      active: 'bool,required',
    },
  });
}], dietsCtrl.create);

/**
 * [put es a route that update the diets]
 */
router.put('/:ID', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word',
      description: 'word',
      active: 'bool',
    },
    params: {
      ID: 'number,required',
    },
  });
}], dietsCtrl.edit);

module.exports = router;
