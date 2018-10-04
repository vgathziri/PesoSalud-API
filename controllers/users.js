const { db } = require('../db');

class UserCtrl {
  constructor() {
    // User data temporary hardcoded
    this.users = [
      {
        id: 1,
        name: 'felipe',
      },
      {
        id: 2,
        name: 'eduardo',
      },
      {
        id: 3,
        name: 'juan',
      },
    ];

    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
  }

  getAll(req, res) {
    return res.status(200).send({
      data: this.users,
    });
  }

  get(req, res) {
    res.status(200).send({
      data: this.users,
    });
  }

  create(req, res) {
    const data = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
    };

    this.users.push(data);

    res.status(201).send({
      data: this.users,
    });
  }

  edit(req, res) {
    const data = {
      message: 'item-updated',
      data: this.users,
    };
    res.status(201).send(data);
  }
}
module.exports = new UserCtrl();
