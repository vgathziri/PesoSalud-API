const { db } = require('../db');
/**
 * [TokenMdl is a class that initializes the functions and the prototype of them]
 */
class TokenMdl {
  constructor(data) {
    this.UserID = data.UserID;
    this.Token = data.Token;
    this.Expires = data.Expires;
    this.TypeToken = data.TypeToken;
    this.Active = data.Active;
    this.Created_at = data.Created_at;
  }

  /**
  * [Create is a method that connects the token with the db]
  * @param  {Object]} req [a new object type token]
  * @return {int}     [return ID of token created object]
  */
  static async create(obj) {
    let data;
    try {
      data = await db.create('Tokens', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
 * [getOne is a function that get a token]
 * @param  {[Object]}  attribute [select a token in a table]
 * @return {Object}           [returns an object type token when is find]
 */
  static async getOne(attribute, value) {
    let data;
    try {
      data = await db.findByAttribute('Tokens', attribute, value);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
   * [findOneActive is a function that find an active token]
   * @param  {[int]}  userId [userId contains active or deactive Tokens]
   * @return {Object}        [returns an user is token is active]
   */
  static async findOneActive(userId) {
    let data;
    try {
      data = await db.findTokenActive('Tokens', userId);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
 * [deactive is a function that deactive a token when end the session of user]
 * @param  {[Object]}  token [token contains an user]
 * @return {Object}       [returns token update]
 */
  static async deactive(token) {
    let data;
    try {
      token[0].Active = 0;
      data = await db.updateToken(token[0], token[0].Token);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
 * [processData is a funtion that creates array of token]
 * @param  {[Object]} data [TokenMdl]
 * @return {[array]}      [returns array of Tokens]
 */
  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new TokenMdl(d));
    });
    return array;
  }
}

module.exports = TokenMdl;
