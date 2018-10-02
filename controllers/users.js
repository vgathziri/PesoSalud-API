const userMdl = require('../models/users');

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

    // Binding this to not loose context on router
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
  }

  getAll(req, res) {
    userMdl.findAll('Users')
      .then(response => res.status(200).send({ data: response }))
      .catch(err => res.status(400).send({ message: err }));
  }

  get(req, res) {
    const data = this.data.find(el => el.id === Number(req.params.userId));

    res.status(200).send(data);
  }

  create(req, res) {
    const lastId = this.data[this.data.length - 1].id;
    const data = {
      id: lastId + 1,
      name: req.body.name,
      email: req.body.email,
    };

    this.data.push(data);

    res.status(201).send(data);
  }
}

module.exports = new UserCtrl();
