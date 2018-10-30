const sendGridMail = require('@sendgrid/mail');

sendGridMail.setApiKey(process.env.SendGrid_APIKey);

class Mail {
  // Function that sends an email to an specific user's email.
  static sendMail(to, subject, type, content) {
    if (to && subject && type && content) {
      var email = {
        to: to,
        from: 'no-reply@pesoysalud.com',
        subject: subject
      }

      switch (type) {
        case 'text':
          email.text = content;
          break;
        case 'html':
          email.html = content;
          break;
        default:
          console.log('Error while sending the email.');
          break;
      }
      sendGridMail.send(email);
    } else {
      console.log('Error while sending the email.');
    }
  }
}

module.exports = Mail;
