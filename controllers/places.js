class PlacesCtrl {
  constructor() {
    this.data = [
      {
        id: 1,
        name: 'Consultorio',
        placeType: 'Consultorio',
        active: 1,
      },
    ];

    this.getAll = this.getAll.bind(this);
    this.edit = this.edit.bind(this);
    this.create = this.create.bind(this);
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
      place_type: req.body.placeType,
      active: req.body.active,

    };
    this.data.push(data);

    res.status(201).send({
      data: this.data,
    });
  }

  edit(req, res) {
    const data = {
      message: 'Item update',
      data: this.data,
    };
    res.status(201).send(data);
  }
}

module.exports = new PlacesCtrl();
