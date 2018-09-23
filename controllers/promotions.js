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
  }

  getAll(req, res) {
    return res.status(200).send({
      data: this.promotions,
    });
  }

  getPromotionbyUser(req, res) {
    const data = this.data.find(usuario => usuario.id === Number(req.params.userId));
    res.status(200).send(data);
  }

  createPromotion(req, res) {
    const lastId = this.data[this.data.length - 1].id;
    const data = {
      id: lastId + 1,
      descrip: req.body.descrip,
    };
    this.data.push(data);

    res.status(201).send(data);
  }

  editPromotion(req, res) {
    const data = { message: 'item-updated' };
    res.status(201).send(data);
  }
}
