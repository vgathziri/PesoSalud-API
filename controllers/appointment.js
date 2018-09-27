class AppointmentCtrl {
  constructor() {
    this.data = [
      {
        id: 1,
        userID: 1,
        serviceID: 1,
        placeID: 1,
        date: '20180910',
        status: 'Agendado',
      },
      {
        id: 2,
        userID: 2,
        serviceID: 2,
        placeID: 2,
        date: '20180911',
        status: 'Cancelado',
      },
    ];

    this.getByDate = this.getByDate.bind(this);
    this.getByUserID = this.getByUserID.bind(this);
    this.getByPlaceID = this.getByPlaceID.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
  }

  getByDate(req, res) {
    res.send(this.data);
  }

  getByUserID(req, res) {
    res.send(this.data);
  }

  getByPlaceID(req, res) {
    res.send(this.data);
  }

  create(req, res) {
    const data = {
      userID: req.body.userID,
      serviceID: req.body.serviceID,
      placeID: req.body.placeID,
      date: req.body.date,
      status: req.body.status,
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

module.exports = new AppointmentCtrl();
