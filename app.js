require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');

const router = require('./routes');

const { errorHandler } = require('./middlewares');

const app = express();

// Cargamos los middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load routes into app
app.use(router);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
