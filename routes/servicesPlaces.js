const { Router } = require('express');

const router = Router();

const middlewares = require('../middlewares');

// FIXME Estandarizar y usar camelCase para los controladores
const { ServicesPlacesCtrl } = require('../controllers');

// FIXME Se recomienda mantener las rutas en minusculas
// FIXME Falta un middleware para validar el param :serviceID que sea un identificador valido, ejem que sea un numero en un cierto rango
router.get('/Service/:serviceID', ServicesPlacesCtrl.searchService);
// FIXME Se recomienda mantener las rutas en minusculas
// FIXME Falta un middleware para validar el param :placeID que sea un identificador valido, ejem que sea un numero en un cierto rango
router.get('/Place/:placeID', ServicesPlacesCtrl.searchPlaces);
// router.delete('/:serviceID-placeID', ServicesPlacesCtrl.edit);

router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      ServicesID: 'required',
      PlaceID: 'required',
    },
  });
}, ServicesPlacesCtrl.create);

// FIXME Falta ruta para eliminación
// FIXME Falta ruta para edición

module.exports = router;
