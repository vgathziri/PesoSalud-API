const { db } = require('../db');
/**
 * [ScheduleMdl contains the body of the object and the attributes of the DB for its connection]
 */
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
 * @param  {[Object]}  obj [Data in the new Schedule instance]
 * @return {Promise}     [try to conect and add the object in the table "Schedule"]
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
 * @param  {[Obejct]}  WeekDay [Attribute in the table for search data register]
 * @return {Promise}         [Fuction for tour and show list data find for value]
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
     * @param  {[Object]}  obj [Receive object or instance to modify ]
     * @param  {[Object]}  id  [Key value interger , identifier that object especific modify]
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
 * @param  {[Object]} data [Attribute for tour the register]
 * @return {[Array]}      [contain with registers tour previusly]
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
