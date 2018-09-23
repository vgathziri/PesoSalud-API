const { Router } = require('express');

const router = Router();

// Cargarmos los middlewares
const bodyParser = require('body-parser');

// parse application/json
router.use(bodyParser.json());

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

// Cargamos la rutas de los modulos
const usersRouter = require('./users');

const placesRouter = require('./places');

const scheduleRouter = require('./schedule');

const dietsRouter = require('./diets');

router.get('/', (req, res) => {
  res.send('This is Home!');
});

router.use('/users', usersRouter);
router.use('/places', placesRouter);
router.use('/schedule', scheduleRouter);
router.use('/diets', dietsRouter);

// si se necesita aplicar un middlewares para todo users
// router.use('/users', middlewares, usersRouter);

module.exports = router;
