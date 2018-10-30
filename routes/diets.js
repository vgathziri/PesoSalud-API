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
  middlewares.validator(req, res, next, {
    params: {
      ID: 'require,number',
    },
  });
}], dietsCtrl.get);

/**
 * [post is a route adds a new diet]
*/
router.post('/', [ensureAuth.haveSession, ensureAuth.havePermission, (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      descripcion: 'word,required',
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
    },
    params: {
      ID: 'number',
    },
  });
}], dietsCtrl.edit);

module.exports = router;
