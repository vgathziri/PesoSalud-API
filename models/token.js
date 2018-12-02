const { db } = require('../db');
/**
 * [TokenMdl class that creates the codes user's session]
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
 * [create function to create new tokens and save in the database]
 * @param  {[Object]}  obj [instance to create the new token object]
 * @return {Promise}     [Token created and stored in the database]
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
  * [getOne Search for tokens created by different parameters]
  * @param  {[data]}  attribute [filter by attribute that belongs to the class]
  * @param  {[interger]}  value    [filter byvalue that one of the attributes of the class has]
  * @return {Promise}           [Chain function to show results]
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
 * [findOneActive filter active tokens by user id]
 * @param  {[Object]}  userId [atributo entero de la clase usuario ]
 * @return {Promise}        [Chain function to show results]
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
 * [deactive function to deactivate sessions by time]
 * @param  {[Object]}  token [reference object to be updated]
 * @return {Promise}       [new token to replace the disabled]
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
 * [processData Recover the token log to add a new token]
 * @param  {[Object]} data [New token created with all its attributes]
 * @return {[Array]}      [container to store and scroll through all created tokens]
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
