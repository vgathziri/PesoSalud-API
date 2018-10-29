const bcrypt = require('bcrypt');
const userMdl = require('../models/users');
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
    this.login = this.constructor.login.bind(this);
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

  /**
 * [getAll is a function to get all users]
 * @return {response}       [returns message with status 400 if isn't found Users
 * or status 400 with all users]
 */
  static async getAll(req, res) {
    let data;
    try {
      data = await userMdl.findAll('Users');
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
 * [create is a function that creates a new user]
  * @param  {Function} next [next]
 * @return {response}       [returns a status 201 that a new user has been created]
 */
  static async create(req, res, next) {
    try {
      const data = await userMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
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
}
module.exports = new UserCtrl();
