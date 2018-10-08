const PromotionsMdl = require('../models/promotions');

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
      data = await PromotionsMdl.findAll('Promotions');
      if (data.length === 0) {
        res.status(400).send({ message: 'Promotions not found' });
      }
    } catch (e) {
      res.status(400).send({ message: e });
    }
    res.status(201).send({ data });
  }

  static async getPromotionbyUser(req, res, next) {
    try {
      const data = await PromotionsMdl.findByUser('Promotions', req.params.UserID);
      if (data.length === 0) {
        res.status(400).send({ message: 'User not found' });
      }
      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  static async createPromotion(req, res, next) {
    try {
      const data = await PromotionsMdl.create('Promotions', req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  static async editPromotion(req, res, next) {
    try {
      const data = await PromotionsMdl.update('Promotions', req.body, req.params.id);

      if (data.length === 0) {
        res.status(400).send({ message: 'Promotions could not be updated' });
      }
      res.status(200).send({ data: 'Promotions updated' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PromotionsCtrl();
