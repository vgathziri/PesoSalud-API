class DietsCtrl {
  constructor() {
    this.data = [
      {
        id: 1,
        name: 'Baja en carbohidratos',
        descripcion: '0 harinas',
        active: 1,
      },
    ];

    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
  }

  getAll(req, res) {
    const json = {
      data: this.data,
      total_count: this.data.length,
      per_page: 10,
      page: 0,
    };
    res.send(json);
  }

  create(req, res) {
    const lastId = this.data[this.data.length - 1].id;
    const data = {
      id: lastId + 1,
      name: req.body.name,
      descripcion: req.body.descripcion,
      active: req.body.active,

    };
    this.data.push(data);

    res.status(201).send(data);
  }

  search(req, res) {
    const data = this.data.find(el => el.id === Number(req.params.id));
    res.status(200).send(data);
  }

  edit(req, res) {
    const json = {
      data: this.data,
      message: 'Item update',
    };
    res.status(201).send(json);
  }
}

module.exports = new DietsCtrl();
