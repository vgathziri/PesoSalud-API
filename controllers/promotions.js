const PromotionsMdl = require('../models/promotions');

// FIXME Todos los metodos deben estar documentados

class PromotionsCtrl {
  constructor() {
    this.getAll = this.constructor.getAll.bind(this);
    this.getPromotionbyUser = this.constructor.getPromotionbyUser.bind(this);
    this.createPromotion = this.constructor.createPromotion.bind(this);
    this.editPromotion = this.constructor.editPromotion.bind(this);
  }

  static async getAll(req, res) {
    let data;
    try {
      data = await PromotionsMdl.findAllPromotions();
      if (data.length === 0) {
        res.status(400).send({ message: 'Promotions not found' });
        return;
      }
    } catch (e) {
      res.status(400).send({ message: e });
      return;
    }
    res.status(201).send({ data });
  }

  static async getPromotionbyUser(req, res, next) {
    try {
      const data = await PromotionsMdl.findByUserID(req.params.id);
      if (data.length === 0) {
        res.status(400).send({ message: 'User not found' });
        return;
      }
      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  static async createPromotion(req, res, next) {
    try {
      const data = await PromotionsMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  static async editPromotion(req, res, next) {
    try {
      const data = await PromotionsMdl.update(req.body, req.params.id);

      if (data.length === 0) {
        res.status(400).send({ message: 'Promotions could not be updated' });
        return;
      }
      res.status(200).send({ data: 'Promotions updated' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PromotionsCtrl();
