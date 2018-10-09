require('dotenv').config();

const express = require('express');

const app = express();

const router = require('./routes');

app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
