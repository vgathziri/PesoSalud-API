const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('This is Home!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
