class PlacesCtrl {
  constructor() {
    this.data = [
      {
        id: 1,
        name: 'Carlos',
        place_type: 'Consultorio',
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
      email: req.body.email,
      place_type: req.body.place_type,
      active: req.body.active,

    };
    this.data.push(data);

    res.status(201).send(data);
  }

  edit(req, res) {
    const data = {
      message: "Item update",
    };
    res.status(201).send(data);
  }

module.exports = new PlacesCtrl();
