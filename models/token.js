const { db } = require('../db');

class TokenMdl {
  constructor(data) {
    this.UserID = data.UserID;
    this.Token = data.Token;
    this.Expires = data.Expires;
    this.TypeToken = data.TypeToken;
    this.Active = data.Active;
    this.Created_at = data.Created_at;
  }

  static async create(obj) {
    let data;
    try {
      data = await db.create('Tokens', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static async getOne(attribute, value) {
    let data;
    try {
      data = await db.findByAttribute('Tokens', attribute, value);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async findOneActive(userId) {
    let data;
    try {
      data = await db.findTokenActive('Tokens', userId);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

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

  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new TokenMdl(d));
    });
    return array;
  }
}

module.exports = TokenMdl;
