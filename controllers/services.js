class ServiceCtrl {
  constructor() {
    this.data = [
      {
        id: 1,
        name: 'Consultory',
        description: 'Main Place',
        placeType: 'Consultory',
        active: 1,
      },
    ];

    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
  }

  getAll(req, res) {
    res.send(this.data);
  }

  create(req, res) {
    const data = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      placeType: req.body.placeType,
      actvie: req.body.active,
    };

    this.data.push(data);
    res.status(201).send(data);
  }

  edit(req, res) {
    const json = {
      data: this.data,
      message: 'Item updated',
    };

    res.status(200).send(json);
  }
}

module.exports = new ServiceCtrl();
