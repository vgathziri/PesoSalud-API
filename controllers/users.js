const bcrypt = require('bcrypt');
const fs = require('fs');
const userMdl = require('../models/users');
const tokenMdl = require('../models/token');
const { sendMail } = require('../services/mail');

/**
 * [Userctrl is a class that initializes the functions and the prototype of them]
 */
class UserCtrl {
  constructor() {
    // Binding this to not loose context on router
    this.getAll = this.constructor.getAll.bind(this);
    this.getUser = this.constructor.getUser.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
    this.setPicture = this.constructor.setPicture.bind(this);
    this.login = this.constructor.login.bind(this);
    this.passwordReset = this.constructor.passwordReset.bind(this);
    this.updatePassword = this.constructor.updatePassword.bind(this);
    this.activateUser = this.constructor.activateUser.bind(this);
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
      if (Number(user[0].Active) === 0){
        next({
          status: 403,
          message: 'This user is not active',
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
          sendMail(user[0].email, '[Peso Y Salud] Please reset your password', 'html', `<div><span>We heard that you lost your Peso y Salud password. Sorry about that!</span><br><br><span>But don’t worry! You can use the following link to reset your password:</span><br><br><a href="${process.env.ENVIRONMENT}:${process.env.DB_PORT}/users/password_reset/${hash.replace(/\//g, '')}" target="_blank">Reset Password</a><br><br><span>or copy and paste this link in your browser</span><br><b>${process.env.ENVIRONMENT}:${process.env.DB_PORT}/users/password_reset/${hash.replace(/\//g, '')}</b><br><br><span>If you don’t use this link within 3 hours, it will expire.</span><br><br><span>Thanks,</span><br><span>Your friends at Peso y Salud</span></div>`);
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

  /**
 * [create is a function that creates a new user]
  * @param  {Function} next [next]
 * @return {response}       [returns a status 201 that a new user has been created]
 */
  static async create(req, res, next) {
    try {
      const id = await userMdl.create(req.body);
      const user = await userMdl.findById(id);

      // Create token
      bcrypt.hash(`${user[0].email}${new Date()}`, Number(process.env.SECRET))
        .then((hash) => {
          tokenMdl.create({
            Token: hash.replace(/\//g, ''),
            UserID: user[0].id,
            Expires: 3,
            TypeToken: 'v', // v -> verify e-mail
            Active: 1,
            Created_at: new Date(),
          });
          return hash;
        })
        .then((hash) => {
          sendMail(user[0].email, '[Peso Y Salud] Please activate your acount', 'html', `<div><span>Dear ${user[0].name},</span><br><br><span>Thank you for joining Peso Y Salud! You have successfully created your account</span><br><br><span>Please press the link below  to verify your email address and complete your registration.</span><br><br><a href="${process.env.ENVIRONMENT}:${process.env.DB_PORT}/users/verify-email/${hash.replace(/\//g, '')}" target="_blank">Complete registration</a><br><br><span>or copy and paste this link in your browser</span><br><b>${process.env.ENVIRONMENT}:${process.env.DB_PORT}/users/verify-email/${hash.replace(/\//g, '')}</b><br><br><span>Best regards,</span><br><span>Your friends at Peso y Salud</span></div>`);
        })
        .then(res.status(201).send({ message: 'Check your email for a link to activate your acount. If it doesn’t appear within a few minutes, check your spam folder.' }))
        .catch(err => next({ status: 400, message: err }));
    } catch (e) {
      next(e);
    }
  }

  static async activateUser(req, res, next) {
    try {
      const token = await tokenMdl.getOne('token', req.params.token);
      if (token.length == 0 || !UserCtrl['isActive'](token)) {
        return next({
          status: 200,
          message: 'Invalid token or token has expired, sorry.',
        });
      }

      const data = await userMdl.update({ Active: 1 }, token[0].UserID);

      // In case user was not found
      if (data === 0) {
        return res.status(400).send({ message: 'User password could not be updated' });
      }

      res.status(200).send({ message: 'User active' });
    } catch (e) {
      next({
        status: 400,
        message: e,
      });
    }
  }

  /**
 * [getAll is a function to get all users]
 * @return {response}       [returns message with status 400 if isn't found Users
 * or status 400 with all users]
 */
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

  /**
 * [getUser is a function to get one user by id]
 * @param  {[integer]}   req  [id]
 * @return {json}       [returns the user object in case that exists]
 */
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

  /**
 * [edit is a function of edit a user in specific]
 * @param  {[integer]}   req  [id]
 * @return {response}       [returns status 200 if diet is updated
 * or status 400 if it couldn´t be found]
  */
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

  static async setPicture(req, res, next) {
    try {
      const data = await userMdl.update({ picture: req.file.path }, req.session.user[0].id);

      if (req.session.user[0].picture != null) {
        fs.unlink(req.session.user[0].picture);
      }

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
