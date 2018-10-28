const { Router } = require('express');

const router = Router();

// Cargamos la rutas de los modulos
const usersRouter = require('./users');
const appointmentsRouter = require('./appointments');
const medicalRecordsRouter = require('./medicalRecords');
const servicesRouter = require('./services');
const placesRouter = require('./places');
const scheduleRouter = require('./schedule');
const dietsRouter = require('./diets');
const servicesPlacesRouter = require('./servicesPlaces');
const promotionsRouter = require('./promotions');
const mailer = require('./mail');

router.get('/', (req, res) => {
  res.send('This is Home!');
});


// Cargamos la rutas de los modulos
// const usersRouter = require('./users');

// Cargamos ruta de "users"
router.use('/users', usersRouter);
router.use('/places', placesRouter);
router.use('/schedule', scheduleRouter);
router.use('/diets', dietsRouter);
router.use('/servicesPlaces', servicesPlacesRouter);
router.use('/appointments', appointmentsRouter);
router.use('/medicalRecords', medicalRecordsRouter);
router.use('/services', servicesRouter);
router.use('/promotions', promotionsRouter);
router.use('/mail', mailer);

module.exports = router;
