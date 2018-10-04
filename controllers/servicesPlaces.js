class ServicesPlacesCtrl {
  create(req, res) {
    const lastId = this.data[this.data.length - 1].id;
    const last2Id = this.data[this.data.length - 1].placeID;
    const data = {
      serviceID: lastId + 1,
      placeID: last2Id + 1,
    };
    this.data.push(data);
    res.status(201).send(data);
  }

  searchService(req, res) {
    const data = this.data.find(el => el.serviceID === Number(req.params.serviceID);
    res.send(data);
  }

  searchPlaces(req, res) {
    const data = this.data.find(el => el.placeID === Number(req.params.placeID);
    res.send(data);
  }

}
module.exports = new ServicesPlacesCtrl();
