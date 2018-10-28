const nodemailer = require('nodemailer');

class ManageMail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    this.transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
    });

    this.mailOptions = {
      from: ' "Express App" <expressjs@example.com> ',
    };
  }

  sendMail(options) {
    const mailOptions = {
      ...this.mailOptions,
      ...options,
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(' Message sent:% s ', info.messageId);
      return true;
    });
  }
}

module.exports = new ManageMail();
