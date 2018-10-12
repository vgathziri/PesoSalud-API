const { Router } = require('express');

const router = Router();

const middlewares = require('../middlewares');

const { serviceCtrl } = require('../controllers');

/**
 * [get is a route gets everything services that is registered]
 */
router.get('/', serviceCtrl.getAll);

/**
 * [post is a route adds a new Services]
*/
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'word,required',
      Description: 'required',
      Price: 'required',
      Duration: 'required',
      Active: 'required',
    },
  });
}, serviceCtrl.create);

/**
 * [put es a route that update the services]
 */
router.put('/:id', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      Name: 'word',
      Description: 'required',
    },
  });
}, serviceCtrl.edit);

module.exports = router;
