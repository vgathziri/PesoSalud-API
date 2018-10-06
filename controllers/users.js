const userMdl = require('../models/users');

class UserCtrl {
  constructor() {
    // Binding this to not loose context on router
    this.getAll = this.constructor.getAll.bind(this);
    this.getUser = this.constructor.getUser.bind(this);
    this.create = this.constructor.create.bind(this);
    this.edit = this.constructor.edit.bind(this);
  }

  static getAll(req, res) {
    userMdl.findAll('Users')
      .then(response => res.status(200).send({ data: response }))
      .catch(err => res.status(400).send({ message: err }));
  }

  static getUser(req, res) {
    userMdl.findById('Users', req.params.id)
      .then((response) => {
        (response.length) !== 0 ? res.status(200).send({ data: response }) : res.status(400).send({ message: 'User not found' })
      })
      .catch(err => res.status(400).send({ message: err }));
  }

  static create(req, res) {
    userMdl.create('Users', req.body)
      .then(response => res.status(200).send({ message: `ID: ${response}` }))
      .catch(err => res.status(400).send({ message: err }));
  }

  static edit(req, res) {
    userMdl.update('Users', req.body, req.params.id)
      .then((response) => {
        (response) !== 0 ? res.status(200).send({ data: 'User updated' }) : res.status(400).send({ message: 'User could not be updated' })
      })
      .catch(err => res.status(400).send({ message: err }));
  }
}
module.exports = new UserCtrl();
