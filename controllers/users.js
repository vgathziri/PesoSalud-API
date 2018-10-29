const bcrypt = require('bcrypt');
const userMdl = require('../models/users');
const tokenMdl = require('../models/token');
const { sendMail } = require('../services/mail');

class UserCtrl {
  constructor() {
    // Binding this to not loose context on router
    this.getAll = this.constructor.getAll.bind(this);
    this.getUser = this.constructor.getUser.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
    this.login = this.constructor.login.bind(this);
    this.passwordReset = this.constructor.passwordReset.bind(this);
    this.updatePassword = this.constructor.updatePassword.bind(this);
  }

  static async login(req, res, next) {
    try {
      const user = await userMdl.findByAttribute('Email', req.body.email);
      if (!(user[0].email === req.body.email && user[0].password === req.body.password)) {
        return next({
          status: 401,
          message: 'Invalid username or password',
        });
      }

      // Create token
      bcrypt.hash(`${user[0].email}${new Date()}`, Number(process.env.SECRET))
        .then((hash) => {
          tokenMdl.create({
            Token: hash,
            UserID: user[0].id,
            Expires: 24,
            TypeToken: 's',
            Active: 1,
            Created_at: new Date(),
          });
          return hash;
        })
        .then(hash => res.status(200).send({ id: user[0].id, token: hash }))
        .catch(err => next({ status: 400, message: err }));
    } catch (e) {
      next({
        status: 400,
        message: e,
      });
    }
  }

  static async passwordReset(req, res, next) {
    try {
      const user = await userMdl.findByAttribute('Email', req.body.email);
      if (!user[0].email) {
        return next({
          status: 200,
          message: "Can't find that email, sorry.",
        });
      }

      // Create token
      bcrypt.hash(`${user[0].email}${new Date()}`, Number(process.env.SECRET))
        .then((hash) => {
          tokenMdl.create({
            Token: hash.replace(/\//g, ''),
            UserID: user[0].id,
            Expires: 3,
            TypeToken: 'r', // r -> reset password
            Active: 1,
            Created_at: new Date(),
          });
          return hash;
        })
        .then((hash) => {
          sendMail(user[0].email, '[Peso Y Salud] Please reset your password', 'html', `<div><span>We heard that you lost your Peso y Salud password. Sorry about that!</span><br><br><span>But don’t worry! You can use the following link to reset your password:</span><br><br><a href="http://localhost:3000/users/password_reset/${hash.replace(/\//g, '')}" target="_blank">Peso y Salud</a><br><br><span>If you don’t use this link within 3 hours, it will expire.</span><br><br><span>Thanks,</span><br><span>Your friends at Peso y Salud</span></div>`);
        })
        .then(res.status(200).send({ message: 'Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.' }))
        .catch(err => next({ status: 400, message: err }));
    } catch (e) {
      next({
        status: 400,
        message: e,
      });
    }
  }

  static async updatePassword(req, res, next) {
    try {
      const token = await tokenMdl.getOne('token', req.params.token);
      console.log('token.length == 0', token.length == 0);
      console.log("!UserCtrl['isActive'](token)", !UserCtrl['isActive'](token));
      if (token.length == 0 || !UserCtrl['isActive'](token)) {
        return next({
          status: 200,
          message: 'Invalid token or token has expired, sorry.',
        });
      }

      const data = await userMdl.update({ Password: req.body.password }, token[0].UserID);
      console.log('data', data);

      // In case user was not found
      if (data === 0) {
        return res.status(400).send({ message: 'User password could not be updated' });
      }

      res.status(200).send({ message: 'Password updated' });
    } catch (e) {
      next({
        status: 400,
        message: e,
      });
    }
  }

  static async getAll(req, res) {
    let data;
    try {
      data = await userMdl.findAll();
      if (data.length === 0) {
        return res.status(400).send({ message: 'Users not found' });
      }
    } catch (e) {
      return res.status(400).send({ message: e });
    }
    res.status(201).send({ data });
  }

  static async getUser(req, res, next) {
    try {
      const data = await userMdl.findById(req.params.id);

      // In case user was not found
      if (data.length === 0) {
        return res.status(400).send({ message: 'User not found' });
      }

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const data = await userMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  static async edit(req, res, next) {
    try {
      const data = await userMdl.update(req.body, req.params.id);

      // In case user was not found
      if (data.length === 0) {
        return res.status(400).send({ message: 'User could not be updated' });
      }

      res.status(200).send({ data: 'User updated' });
    } catch (e) {
      next(e);
    }
  }

  static isActive(token) {
    const createdAt = (new Date(token[0].Created_at)).getTime();
    const now = (new Date()).getTime();
    const timeExpires = token[0].Expires;
    if (now >= UserCtrl['addHours'](createdAt, timeExpires)) {
      return false;
    }
    return true;
  }

  static addHours(date, hours) {
    return ((new Date(date)).setHours((new Date(date)).getHours() + Number(hours)));
  }
}
module.exports = new UserCtrl();
