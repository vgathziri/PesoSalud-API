require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const router = require('./routes');

const { errorHandler } = require('./middlewares');

const app = express();

app.use(cors());

// Cargamos los middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load routes into app
app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
