const { Router } = require('express');

const router = Router();

const { promotionsCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', promotionsCtrl.getAll);
// FIXME Falta en el middleware validar el param :id que sea un identificador valido, ejem que sea un numero en un cierto rango
router.get('/:id', promotionsCtrl.getPromotionbyUser);
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      UserID: 'required',
      ServiceID: 'required',
      Date: 'required',
      QuantityBought: 'required',
    },
  });
}, promotionsCtrl.createPromotion);

// FIXME Falta en el middleware validar el param :id que sea un identificador valido, ejem que sea un numero en un cierto rango
// FIXME Falta middleware para validar el cuerpo del request
router.put('/:id', promotionsCtrl.editPromotion);

// FIXME Falta ruta para eliminación

module.exports = router;
