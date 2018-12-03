const { db } = require('../db');
/**
 * [UserMdl is a class that initializes the functions and the prototype of them]
 */
class UserMdl {
  constructor(data) {
    this.id = data.ID;
    this.email = data.Email;
    this.password = data.Password;
    this.name = data.Name;
    this.gender = data.Gender;
    this.phone = data.Phone;
    this.BirthDate = data.BirthDate;
    this.RegisteredDate = data.RegisteredDate;
    this.Height = data.Height;
    this.UserType = data.UserType;
    this.Comments = data.Comments;
    this.picture = data.Picture;
    this.Active = data.Active;
  }

  /**
 * [Create is a method that connects the Users with the db]
 * @param  {Object]} req [a new objet]
 * @return {int}     [return ID of created obj]
 */
  static async create(obj) {
    let data;
    try {
      data = await db.create('Users', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
   * [findAll is a method of find all Users were register]
   * @return {Object} [return objects when is find]
   */
  static async findAll() {
    let data;
    try {
      data = await db.findAll('Users');
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
   * [findById is a method of find Users by id]
   * @param  {int]}  req [userId]
   * @return {Object} [return an object when is find]
   */
  static async findById(userId) {
    let data;
    try {
      data = await db.findById('Users', userId);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
   * [findByAttribute is a method of find Users by an attribute]
   * @param  {String]}  req [attribute]
   * @return {Object} [return an object when is find]
   */
  static async findByAttribute(attribute, value) {
    let data;
    try {
      data = await db.findByAttribute('Users', attribute, value);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
 * [update is a method of call aupdate of db]
 * @param  {[Object]} req    [obj]
 * @param  {[int]}  userId [userID]
 * @return {Object}        [return object update if does exists]
 */
  static async update(obj, userId) {
    let data;
    try {
      data = await db.update('Users', obj, userId);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
   * [processData is a function that creates array of Users]
   * @param  {[Objetc]} data [UsersMdl]
   * @return {[array]}      [returns array of Users]
   */
  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new UserMdl(d));
    });
    return array;
  }
}

module.exports = UserMdl;
