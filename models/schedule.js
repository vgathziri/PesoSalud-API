const { db } = require('../db');

class ScheduleMdl {
  constructor(data) {
    this.id = data.ID;
    this.weekDay = data.WeekDay;
    this.startTime = data.StartTime;
    this.endTime = data.EndTime;
    this.active = data.Active;
  }

  /**
 * [create is a fuction for add a new instance in the table (database)]
 * @param  {[type]}  obj [Data in the new Schedule instance]
 * @return {Promise}     [try to conect the object in the table "Schedule"]
 */
  static async create(obj) {
    let data;
    try {
      data = await db.create('Schedule', obj);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
 * [findByWeekday Fuction search data in database for a especific weekday ]
 * @param  {[type]}  WeekDay [Attribute in the table for search data register]
 * @return {Promise}         [Show list data find for value]
 */
  static async findByWeekday(WeekDay) {
    let data;
    try {
      data = await db.findByAttribute('Schedule', 'WeekDay', WeekDay);
    } catch (e) {
      throw e;
    }
    return this.processData(data);
  }

  /**
     * [edit Fuction update data whith change in the object create]
     * @param  {[type]}  obj [Receive object or instance to modify ]
     * @param  {[Int]}  id  [Key value , identifier that object especific modify]
     * @return {Promise}     [Chanege data successful in database]
     */
  static async edit(obj, id) {
    let data;
    try {
      data = await db.update('Schedule', obj, id);
    } catch (e) {
      throw e;
    }
    return data;
  }

  /**
 * [processData is a fuction for tour registers and show all ]
 * @param  {[type]} data [Attribute for tour the register]
 * @return {[type]}      [Array with registers tour previusly]
 */
  static processData(data) {
    const array = [];
    data.forEach((d) => {
      array.push(new ScheduleMdl(d));
    });
    return array;
  }
}

module.exports = ScheduleMdl;
