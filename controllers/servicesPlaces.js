class ServicesPlacesCtrl {
  constructor() {
    this.data = [
      {
        servicesID: 1,
        placeID: 1,
      },
    ];

    this.create = this.create.bind(this);
    this.searchService = this.searchService.bind(this);
    this.searchPlaces = this.searchPlaces.bind(this);
  }

  create(req, res) {
    const data = {
      serviceID: req.body.service,
      placeID: req.body.place,
    };

    this.data.push(data);
    res.status(201).send({
      data: this.data,
    });
  }

  searchService(req, res) {
    res.send({
      data: this.data,
    });
  }

  searchPlaces(req, res) {
    res.send({
      data: this.data,
    });
  }
}

module.exports = new ServicesPlacesCtrl();
