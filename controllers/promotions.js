const promotionsMdl = require('../models/promotions');

/**
 * [PromotionsCtrl class to manage search registers,to filter, add new object and updated fuctions]
 */
class PromotionsCtrl {
  constructor() {
    this.getAll = this.constructor.getAll.bind(this);
    this.getPromotionbyUser = this.constructor.getPromotionbyUser.bind(this);
    this.createPromotion = this.constructor.createPromotion.bind(this);
    this.editPromotion = this.constructor.editPromotion.bind(this);
  }

  /**
 * [getAll -Fuction to get(show) all the promotions]
 * @param  {[Obect]}  req [client´s request all objects Body ]
 * @param  {[Object]}  res [response that status to the fuction or send data founded ]
 */

  static async getAll(req, res) {
    let data;
    try {
      data = await promotionsMdl.findAllPromotions();
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

  /**
     * [getPromotionbyUser is a fuction for get to promotions per id of user ]
     * @param  {[Obect]}   req  [client´s request body.id (interger)key attribute]
     * @param  {[Obect]}   res  [response the data and status from fuction]
     * @param  {Function} next [The function nerby or next funcion middlewear]
     */

  static async getPromotionbyUser(req, res, next) {
    try {
      const data = await promotionsMdl.findByUserID(req.params.id);
      if (data.length === 0) {
        res.status(400).send({ message: 'User not found' });
        return;
      }
      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  /**
 * [createPromotion Add a new object Promotion ]
 * @param  {[Object]}   req  [client´s request for create a new object, Body.id identicador]
 * @param  {[Obect]}   res  [response the data and  status to the fuction]
 * @param  {createPromotion} next [Continuos to the next fuction the middlewear]
 */

  static async createPromotion(req, res, next) {
    try {
      const data = await promotionsMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  /**
 * [editPromotion Modify data in a object previusly created ]
 * @param  {[Object]}   req  [Body form and id interger, key value the promotions client´s request]
 * @param  {[Obect]}   res  [reponse the status of the function 200 its successful]
 * @param  {Function} next [Continue whith The next funtion in the middlewear ]
 */

  static async editPromotion(req, res, next) {
    try {
      const data = await promotionsMdl.update(req.body, req.params.id);
      // In case the promotion isn´t found
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

/**
 * [exports funtions in a object for use in the other files]
 * @type {PromotionsCtrl}
 */
module.exports = new PromotionsCtrl();
