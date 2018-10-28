const router = require('express').Router();
const mailer = require('../mail');

router.get('/', (req, res) => {
  mailer.sendMail(mailOptions);
  res.send('ExpressJS 101 API');
});

router.get();

let mailOptions = {
  to: 'test@email.mx',
  subject: 'Verify Account PesoSalud ✔',
  text: 'Hi, from Peso-Salud please',
  html: Click <a href= "url/confirmacion?token">here</a>to active your account",
};


module.exports = router;
