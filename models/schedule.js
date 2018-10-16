const { db } = require('../db');

// FIXME Todos los metodos deben estar documentados

class ScheduleMdl {
  constructor(data) {
    this.id = data.ID;
    this.weekDay = data.WeekDay;
    this.startTime = data.StartTime;
    this.endTime = data.EndTime;
    this.active = data.Active;
  }

  static async create(obj) {
    let data;
    try {
      data = await db.create('Schedule', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  static async findByWeekday(WeekDay) {
    let data;
    try {
      data = await db.findByAttribute('Schedule', 'WeekDay', WeekDay);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  static async edit(obj, id) {
    let data;
    try {
      data = await db.update('Schedule', obj, id);
    } catch (e) {
      throw e;
    }
    return data;
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
