class PromotionsCtrl {
  constructor() {
    // Datos Temporales
    this.promotions = [
      {
        id: 1,
        descri: '5ta sesion gratis',
      },
      {
        id: 2,
        descrip: '2x1',
      },
      {
        id: 3,
        descrip: 'paquete dieta',
      },
    ];

    this.getAll = this.getAll.bind(this);
    this.getPromotionbyUser = this.getPromotionbyUser.bind(this);
    this.createPromotion = this.createPromotion.bind(this);
    this.editPromotion = this.editPromotion.bind(this);
  }

  getAll(req, res) {
    return res.status(200).send({
      data: this.promotions,
    });
  }

  getPromotionbyUser(req, res) {
    return res.status(200).send({
      data: this.promotions,
    });
  }

  createPromotion(req, res) {
    const data = {
      id: req.body.id,
      descrip: req.body.descrip,
    };
    this.promotions.push(data);

    res.status(201).send({
      data: this.promotions,
    });
  }

  editPromotion(req, res) {
    const data = {
      message: 'item-updated',
      data: this.promotions,
    };
    res.status(201).send(data);
  }
}

module.exports = new PromotionsCtrl();
