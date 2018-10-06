const userMdl = require('../models/users');

class UserCtrl {
  constructor() {
    // Binding this to not loose context on router
    this.getAll = this.getAll.bind(this);
    this.getUser = this.getUser.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
  }

  getAll(req, res) {
    userMdl.findAll('Users')
      .then(response => res.status(200).send({ data: response }))
      .catch(err => res.status(400).send({ message: err }));
  }

  getUser(req, res) {
    userMdl.findById('Users', req.params.id)
      .then(response => {
        (response.length) !== 0 ? res.status(200).send({ data: response }) : res.status(400).send({ message: 'User not found' })
      })
      .catch(err => res.status(400).send({ message: err }));
  }

  create(req, res) {
    userMdl.create('Users', req.body)
      .then(response => res.status(200).send({ message: `ID: ${response}` }))
      .catch(err => res.status(400).send({ message: err }));
  }

  edit(req, res) {
    userMdl.update('Users', req.body, req.params.id)
      .then(response => res.status(200).send({ message: `Number of changed rows: ${response}` }))
      .catch(err => res.status(400).send({ message: err }));
  }
}
module.exports = new UserCtrl();
