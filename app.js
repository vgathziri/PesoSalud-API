require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const router = require('./routes');

const { errorHandler } = require('./middlewares');

const app = express();

// Cargamos los middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Load routes into app
app.use(router);

app.use(errorHandler);

app.listen(process.env.DB_PORT, () => {
  console.log(`Server is running on port ${process.env.DB_PORT}...`);
});
