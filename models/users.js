const { db } = require('../db');

class UserMdl {
  constructor(data) {
    this.id = data.ID;
    this.email = data.Email;
    this.name = data.Name;
    this.gender = data.Gender;
    this.phone = data.Phone;
    this.BirthDate = data.BirthDate;
    this.RegisteredDate = data.RegisteredDate;
    this.Height = data.Height;
    this.UserType = data.UserType;
    this.Comments = data.Comments;
  }

  static async create(table, obj) {
    let data;
    try {
      data = await db.create('Users', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static async findAll(table) {
    let data;
    try {
      data = await db.findAll(table);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async findById(table, userId) {
    let data;
    try {
      data = await db.findById(table, userId);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async update(table, obj, userId) {
    let data;
    try {
      data = await db.update('Users', obj, userId);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new UserMdl(d));
    });
    return array;
  }
}

module.exports = UserMdl;
