const { Router } = require('express');

const router = Router();

const middlewares = require('../middlewares');

const { dietsCtrl } = require('../controllers');

/**
 * [get is a route gets everything diets that is registered]
 */
router.get('/', dietsCtrl.getAll);

/**
 * [get by id is a route get a diet in specific]
 */

router.get('/:ID', dietsCtrl.get);

/**
 * [post is a route adds a new diet]
*/
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'required',
      Descripcion: 'required',
      Active: 'required',
    },
  });
}, dietsCtrl.create);

/**
 * [put es a route that update the diets]
 */
router.put('/:ID', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'required',
    },
  });
}, dietsCtrl.edit);

module.exports = router;
