class DietsCtrl {
  constructor() {
    this.data = [
      {
        id: 1,
        name: 'Baja en carbohidratos',
        description: '0 harinas',
        active: 1,
      },
    ];

    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
  }

  getAll(req, res) {
    const json = {
      data: this.data,
    };
    res.send(json);
  }

  create(req, res) {
    const data = {
      id: req.body.id,
      name: req.body.name,
      descripcion: req.body.description,
      active: req.body.active,

    };
    this.data.push(data);

    res.status(201).send({
      data: this.data,
    });
  }

  get(req, res) {
    res.status(200).send({
      data: this.data,
    });
  }

  edit(req, res) {
    const json = {
      data: this.data,
      message: 'Item updated',
    };
    res.status(201).send(json);
  }
}

module.exports = new DietsCtrl();
