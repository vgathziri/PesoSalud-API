const { db } = require('../db');

class ScheduleMdl {
  constructor(data) {
    this.id = data.ID;
    this.weekDay = data.WeekDay;
    this.startTime = data.StartTime;
    this.endTime = data.EndTime;
    this.active = data.Active;
  }

  create() {
    return new Promise((resolve, reject) => {
      db.create('Schedule', this)
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
      array.push(new ScheduleMdl(d));
    });
    return array;
  }
}

module.exports = ScheduleMdl;
