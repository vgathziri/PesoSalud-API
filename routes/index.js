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

router.get('/', (req, res) => {
  res.send('This is Home!');
});

// Cargamos la rutas de los modulos
// const usersRouter = require('./users');

// Cargamos ruta de "users"
router.use('/users', usersRouter);

// si se necesita aplicar un middlewares para todo users
// router.use('/users', middlewares, usersRouter);

const promotionsRouter = require('./promotions');

router.use('/promotions', promotionsRouter);

module.exports = router;
