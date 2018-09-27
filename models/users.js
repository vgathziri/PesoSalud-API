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

  create() {
    return new Promise((resolve, reject) => {
      db.create('Users', this)
        .then(res => resolve(this.processData(res)))
        .catch(err => reject(err));
    });
  }

  static findAll(table) {
    return new Promise((resolve, reject) => {
      db.findAll(table)
        .then(res => resolve(this.processData(res)))
        .catch(err => reject(err));
    });
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
